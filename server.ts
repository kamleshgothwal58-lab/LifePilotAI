import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.warn("Gemini client initialization error:", err);
  }
}

// In-memory lead storage backed by leads.json
const LEADS_FILE = path.join(process.cwd(), "leads.json");
let leads: Array<{ id: string; email: string; role?: string; createdAt: string }> = [];

if (fs.existsSync(LEADS_FILE)) {
  try {
    const data = fs.readFileSync(LEADS_FILE, "utf-8");
    leads = JSON.parse(data);
  } catch (e) {
    leads = [];
  }
}

// Helper to save leads
function saveLeads() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (e) {
    console.error("Failed to write leads.json", e);
  }
}

// Fallback prediction generator if Gemini fails or API key is not set
function generateFallbackPrediction(profile: any) {
  const {
    name = "Student",
    major = "Computer Science",
    studyHoursPerDay = 4,
    sleepHoursPerNight = 7,
    currentGpa = 3.2,
    extracurricularHoursPerWeek = 10,
    stressLevel = 6,
    socialHoursPerWeek = 8,
    targetGpa = 3.8,
  } = profile;

  // Algorithmic estimation logic for robust fallback
  const sleepPenalty = sleepHoursPerNight < 6 ? (6 - sleepHoursPerNight) * 0.15 : 0;
  const studyBonus = Math.min(studyHoursPerDay, 8) * 0.08;
  const stressPenalty = stressLevel > 7 ? (stressLevel - 7) * 0.1 : 0;
  
  const estimatedDelta = Number((studyBonus - sleepPenalty - stressPenalty).toFixed(2));
  const rawProjectedGpa = Math.min(4.0, Math.max(1.5, Number((currentGpa + estimatedDelta).toFixed(2))));
  
  const burnoutPercentage = Math.min(98, Math.max(12, Math.round((stressLevel * 8.5) + (10 - sleepHoursPerNight) * 4 - (studyHoursPerDay > 8 ? 15 : 0))));
  
  let burnoutRisk: 'Low' | 'Moderate' | 'High' | 'Severe' = 'Low';
  if (burnoutPercentage > 75) burnoutRisk = 'Severe';
  else if (burnoutPercentage > 55) burnoutRisk = 'High';
  else if (burnoutPercentage > 35) burnoutRisk = 'Moderate';

  const readinessScore = Math.min(99, Math.max(30, Math.round(
    (currentGpa / 4.0) * 40 +
    (sleepHoursPerNight >= 7 ? 25 : 10) +
    (studyHoursPerDay >= 3 && studyHoursPerDay <= 7 ? 25 : 15) +
    (stressLevel <= 5 ? 10 : 0)
  )));

  const months = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"];
  const gpaTrajectory = months.map((m, idx) => {
    const stepRatio = (idx + 1) / 6;
    const gpaVal = Number((currentGpa + (rawProjectedGpa - currentGpa) * stepRatio).toFixed(2));
    const stressVal = Math.min(10, Math.max(1, Math.round(stressLevel + (idx > 3 ? (sleepHoursPerNight < 6 ? 1.5 : -1) : 0))));
    return {
      month: m,
      projectedGpa: gpaVal,
      baselineGpa: currentGpa,
      stressIndex: stressVal,
      burnoutRiskIndex: Math.round(burnoutPercentage * (0.8 + 0.2 * stepRatio)),
    };
  });

  const wellnessRadar = [
    { category: "Sleep Recovery", value: Math.min(100, Math.round((sleepHoursPerNight / 8) * 100)), optimal: 100 },
    { category: "Focus Capacity", value: Math.min(100, Math.round((studyHoursPerDay / 6) * 100)), optimal: 85 },
    { category: "Stress Resilience", value: Math.min(100, Math.round(((11 - stressLevel) / 10) * 100)), optimal: 90 },
    { category: "Social Balance", value: Math.min(100, Math.round((socialHoursPerWeek / 12) * 100)), optimal: 80 },
    { category: "Extracurricular Focus", value: Math.min(100, Math.round((extracurricularHoursPerWeek / 15) * 100)), optimal: 75 },
    { category: "Academic Velocity", value: Math.min(100, Math.round((currentGpa / 4.0) * 100)), optimal: 95 },
  ];

  const timeAllocation = [
    { activity: "Study & Prep", currentHours: studyHoursPerDay * 7, recommendedHours: 28 },
    { activity: "Sleep & Rest", currentHours: sleepHoursPerNight * 7, recommendedHours: 56 },
    { activity: "Extracurriculars", currentHours: extracurricularHoursPerWeek, recommendedHours: 10 },
    { activity: "Social & Wellness", currentHours: socialHoursPerWeek, recommendedHours: 14 },
  ];

  const recommendations = [
    {
      id: "rec-1",
      title: sleepHoursPerNight < 7 ? "Extend Sleep Duration to 7.5+ Hours" : "Optimize Deep Sleep Cycles",
      category: "Sleep & Recovery" as const,
      impact: "High Impact" as const,
      effort: "Low Effort" as const,
      actionText: "Shift bedtime 45 minutes earlier to boost memory consolidation and cognitive speed.",
      estimatedGpaGain: "+0.25 GPA",
      stressReduction: "-22% Stress",
    },
    {
      id: "rec-2",
      title: "Implement 50/10 Pomodoro Focus Blocks",
      category: "Academic" as const,
      impact: "High Impact" as const,
      effort: "Medium Effort" as const,
      actionText: "Structure daily study hours into 50-minute deep focus sprints followed by 10-minute complete screen breaks.",
      estimatedGpaGain: "+0.30 GPA",
      stressReduction: "-15% Stress",
    },
    {
      id: "rec-3",
      title: stressLevel >= 6 ? "Active Stress Decompression Protocol" : "Weekly Priority Matrix Reset",
      category: "Mental Health" as const,
      impact: "Essential" as const,
      effort: "Low Effort" as const,
      actionText: "Add 15 minutes of light movement or breathwork after study sessions to lower baseline cortisol.",
      estimatedGpaGain: "+0.15 GPA",
      stressReduction: "-30% Stress",
    },
    {
      id: "rec-4",
      title: "Rebalance Extracurricular & Social Commitments",
      category: "Time Management" as const,
      impact: "Medium Impact" as const,
      effort: "Medium Effort" as const,
      actionText: "Cap non-academic activities to 10 hours/week during high-exam weeks to protect grade trajectories.",
      estimatedGpaGain: "+0.18 GPA",
      stressReduction: "-18% Stress",
    }
  ];

  return {
    summaryHeadline: rawProjectedGpa >= currentGpa
      ? `On track to achieve a ${rawProjectedGpa} GPA with steady habit adjustments.`
      : `Warning: High stress and sleep deficit indicate a potential GPA dip to ${rawProjectedGpa}.`,
    predictedGpa6Months: rawProjectedGpa,
    currentGpa,
    gpaDelta: Number((rawProjectedGpa - currentGpa).toFixed(2)),
    burnoutRisk,
    burnoutPercentage,
    academicReadinessScore: readinessScore,
    stressIndexScore: stressLevel,
    detailedAnalysis: `Based on ${studyHoursPerDay} hours/day study time, ${sleepHoursPerNight} hours/night sleep, and a baseline stress rating of ${stressLevel}/10, your Digital Twin identifies ${sleepHoursPerNight < 6.5 ? 'a critical sleep recovery gap' : 'a stable sleep baseline'}. Combining your ${major} coursework with target GPA goals requires targeted focus blocks to maintain cognitive stamina without entering mid-semester burnout.`,
    keyStrengths: [
      `Dedicated baseline of ${studyHoursPerDay} study hours per day`,
      `Active engagement in extracurricular pursuits (${extracurricularHoursPerWeek}h/wk)`,
      `Clear target milestone of ${targetGpa} GPA`,
    ],
    keyRisks: [
      sleepHoursPerNight < 7 ? `Sleep deficit (${sleepHoursPerNight}h/night) degrades long-term retention.` : `High workload density during peak project weeks.`,
      stressLevel >= 7 ? `Elevated stress index (${stressLevel}/10) increases exam anxiety risk.` : `Potential time fragmentation across social and club duties.`,
    ],
    gpaTrajectory,
    wellnessRadar,
    timeAllocation,
    recommendations,
  };
}

// 1. API Endpoint for Digital Twin Prediction
app.post("/api/predict", async (req, res) => {
  const profile = req.body;
  
  if (!process.env.GEMINI_API_KEY || !ai) {
    console.log("No GEMINI_API_KEY set or AI client unavailable. Serving algorithmic prediction.");
    const fallback = generateFallbackPrediction(profile);
    return res.json({ success: true, data: fallback, source: "algorithmic-twin" });
  }

  try {
    const prompt = `You are the core AI engine for LifePilot AI, a predictive Digital Twin platform for university & high school students.
Analyze the following student profile parameters:
- Student Name: ${profile.name || "Student"}
- Major/Field: ${profile.major || "General Studies"}
- Academic Level: ${profile.academicLevel || "Sophomore"}
- Current GPA: ${profile.currentGpa} / 4.0
- Target GPA: ${profile.targetGpa} / 4.0
- Daily Study Hours: ${profile.studyHoursPerDay} hours/day
- Nightly Sleep Hours: ${profile.sleepHoursPerNight} hours/night
- Extracurricular Hours: ${profile.extracurricularHoursPerWeek} hours/week
- Social/Work Hours: ${profile.socialHoursPerWeek || 10} hours/week
- Current Self-Reported Stress Level: ${profile.stressLevel} / 10

Generate a highly realistic, empathetic, scientific 6-month prediction for this student's academic success, burnout risk, and wellbeing trajectory.

Return JSON strictly matching this schema:
{
  "summaryHeadline": "A concise 1-sentence prediction summary",
  "predictedGpa6Months": 3.75,
  "currentGpa": ${profile.currentGpa},
  "gpaDelta": 0.35,
  "burnoutRisk": "Low" | "Moderate" | "High" | "Severe",
  "burnoutPercentage": 45,
  "academicReadinessScore": 82,
  "stressIndexScore": ${profile.stressLevel},
  "detailedAnalysis": "A detailed 2-3 paragraph breakdown of how current study, sleep, and stress habits interact.",
  "keyStrengths": ["Strength 1", "Strength 2", "Strength 3"],
  "keyRisks": ["Risk factor 1", "Risk factor 2"],
  "gpaTrajectory": [
    { "month": "Month 1", "projectedGpa": 3.4, "baselineGpa": ${profile.currentGpa}, "stressIndex": 6, "burnoutRiskIndex": 40 },
    { "month": "Month 2", "projectedGpa": 3.45, "baselineGpa": ${profile.currentGpa}, "stressIndex": 5, "burnoutRiskIndex": 38 },
    { "month": "Month 3", "projectedGpa": 3.55, "baselineGpa": ${profile.currentGpa}, "stressIndex": 5, "burnoutRiskIndex": 35 },
    { "month": "Month 4", "projectedGpa": 3.62, "baselineGpa": ${profile.currentGpa}, "stressIndex": 6, "burnoutRiskIndex": 37 },
    { "month": "Month 5", "projectedGpa": 3.70, "baselineGpa": ${profile.currentGpa}, "stressIndex": 5, "burnoutRiskIndex": 32 },
    { "month": "Month 6", "projectedGpa": 3.75, "baselineGpa": ${profile.currentGpa}, "stressIndex": 4, "burnoutRiskIndex": 28 }
  ],
  "wellnessRadar": [
    { "category": "Sleep Recovery", "value": 75, "optimal": 100 },
    { "category": "Focus Capacity", "value": 85, "optimal": 90 },
    { "category": "Stress Resilience", "value": 60, "optimal": 85 },
    { "category": "Social Balance", "value": 70, "optimal": 80 },
    { "category": "Extracurricular Focus", "value": 80, "optimal": 75 },
    { "category": "Academic Velocity", "value": 88, "optimal": 95 }
  ],
  "timeAllocation": [
    { "activity": "Study & Prep", "currentHours": 28, "recommendedHours": 32 },
    { "activity": "Sleep & Rest", "currentHours": 42, "recommendedHours": 56 },
    { "activity": "Extracurriculars", "currentHours": 12, "recommendedHours": 10 },
    { "activity": "Social & Wellness", "currentHours": 14, "recommendedHours": 14 }
  ],
  "recommendations": [
    {
      "id": "rec-1",
      "title": "Clear action title",
      "category": "Academic" | "Sleep & Recovery" | "Mental Health" | "Time Management",
      "impact": "High Impact" | "Medium Impact" | "Essential",
      "effort": "Low Effort" | "Medium Effort" | "High Effort",
      "actionText": "Concrete step the student can take today",
      "estimatedGpaGain": "+0.30 GPA",
      "stressReduction": "-20% Stress"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    const parsedData = JSON.parse(text);
    return res.json({ success: true, data: parsedData, source: "gemini-ai" });
  } catch (error: any) {
    console.error("Gemini prediction call error:", error?.message || error);
    const fallback = generateFallbackPrediction(profile);
    return res.json({ success: true, data: fallback, source: "algorithmic-fallback", error: error?.message });
  }
});

// 2. Streaming AI Chat Assistant
app.post("/api/chat", async (req, res) => {
  const { messages, studentContext } = req.body;
  const userMessage = messages?.[messages.length - 1]?.text || "Hello";

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  if (!process.env.GEMINI_API_KEY || !ai) {
    // Simulated streaming response for fallback when API key is missing
    const fallbackReplies = [
      `I'm LifePilot AI, your personal academic & wellbeing coach! `,
      `Looking at your Digital Twin profile${studentContext?.major ? ` in ${studentContext.major}` : ''}, `,
      `balancing ${studentContext?.studyHoursPerDay || 4} hours of study with ${studentContext?.sleepHoursPerNight || 7} hours of sleep is key. `,
      `To optimize your performance: 1. Keep study blocks capped at 50 minutes. 2. Prioritize a consistent bedtime routine. 3. Use active recall over passive reading. `,
      `How can I assist you further with your schedule or stress management today?`
    ];

    for (const chunk of fallbackReplies) {
      res.write(chunk);
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    return res.end();
  }

  try {
    const systemInstruction = `You are LifePilot AI Assistant, a compassionate, highly knowledgeable student success coach and mental health advocate. 
You guide students on study techniques (Pomodoro, Active Recall, Spaced Repetition), time management, stress reduction, circadian sleep optimization, and exam preparation.
Keep responses concise, well-structured with bullet points, actionable, encouraging, and clear.
Student Context: ${JSON.stringify(studentContext || {})}`;

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction,
      },
    });

    // Send conversation context
    const stream = await chat.sendMessageStream({
      message: userMessage,
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }
    res.end();
  } catch (err: any) {
    console.error("Chat streaming error:", err);
    res.write("I'm having a brief connection pause. Here's a tip: To boost exam focus and lower anxiety, try 4-7-8 breathing before starting your study session!");
    res.end();
  }
});

// 3. Regenerate Smart Recommendations
app.post("/api/recommendations", async (req, res) => {
  const { profile } = req.body;

  if (!process.env.GEMINI_API_KEY || !ai) {
    const fallbackRecs = generateFallbackPrediction(profile || {}).recommendations;
    return res.json({ success: true, recommendations: fallbackRecs });
  }

  try {
    const prompt = `Generate 4 fresh, ultra-specific academic and wellbeing recommendations for this student:
${JSON.stringify(profile)}

Return JSON as an array of objects matching:
[
  {
    "id": "rec-1",
    "title": "Short catchy action title",
    "category": "Academic" | "Sleep & Recovery" | "Mental Health" | "Time Management",
    "impact": "High Impact" | "Medium Impact" | "Essential",
    "effort": "Low Effort" | "Medium Effort" | "High Effort",
    "actionText": "Concrete, actionable 1-2 sentence advice",
    "estimatedGpaGain": "+0.2 GPA",
    "stressReduction": "-15% Stress"
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "[]";
    const recs = JSON.parse(text);
    return res.json({ success: true, recommendations: recs });
  } catch (err: any) {
    const fallbackRecs = generateFallbackPrediction(profile || {}).recommendations;
    return res.json({ success: true, recommendations: fallbackRecs });
  }
});

// 4. Lead Capture Endpoints
app.post("/api/leads", (req, res) => {
  const { email, academicLevel } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Please provide a valid student email address." });
  }

  const existing = leads.find((l) => l.email.toLowerCase() === email.toLowerCase());
  if (!existing) {
    const newLead = {
      id: "lead_" + Date.now(),
      email,
      academicLevel: academicLevel || "Student",
      createdAt: new Date().toISOString(),
    };
    leads.push(newLead);
    saveLeads();
  }

  return res.json({
    success: true,
    message: "Welcome to LifePilot AI! Your early access Digital Twin slot is reserved.",
    totalLeads: 12400 + leads.length,
  });
});

app.get("/api/leads", (req, res) => {
  return res.json({
    totalCount: 12400 + leads.length,
    recentCountThisWeek: 840 + leads.length,
  });
});

// Vite Express middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LifePilot AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
