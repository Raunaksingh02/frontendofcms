import React, { useState, useRef } from "react";
import { Plus, Trash2, Upload, Download, User, Check } from "lucide-react";

const uid = () => Math.random().toString(36).slice(2, 10);

const initialState = {
  name: "Max Johnson",
  title: "UX Designer",
  photo: null,
  address: "New York, USA",
  phone: "+1 2345 6789",
  email: "max.johnson@email.com",
  profile:
    "Experienced UX Designer specializing in user research, interaction design, and prototyping. Committed to crafting intuitive and visually compelling digital experiences that captivate users. A problem-solver who combines creativity with data-driven insights to drive innovation.",
  skills: ["Figma", "Adobe XD", "Sketch", "InVision", "Photoshop"],
  languages: ["English", "French", "Russian"],
  hobbies: ["Photography", "Football", "Cooking"],
  experience: [
    {
      id: uid(),
      role: "Senior UX Designer",
      company: "ABC Tech Solutions – New York",
      start: "Jan 2020",
      end: "Dec 2022",
      bullets:
        "Led UX team for mobile banking app, boosting user engagement by 30% in six months.\nConducted in-depth user research, reducing e-commerce cart abandonment by 25% through redesign.",
    },
    {
      id: uid(),
      role: "UX Designer",
      company: "XYZ Design Agency – Texas",
      start: "Jan 2018",
      end: "Dec 2019",
      bullets:
        "Collaborated with diverse clients to align designs with business objectives, achieving a 15% boost in healthcare app user satisfaction.\nConducted impactful user tests on a financial site, pinpointing pain points and driving a 20% surge in conversion rates.",
    },
  ],
  education: [
    {
      id: uid(),
      degree: "Master of Science in HCI",
      school: "New York University – New York",
      start: "Jan 2016",
      end: "Dec 2018",
    },
    {
      id: uid(),
      degree: "Bachelor of Science in UX Design",
      school: "University of Washington – Washington",
      start: "Jan 2011",
      end: "Dec 2015",
    },
  ],
};

/* ---------------------------- FORM HELPERS ---------------------------- */

function Field({ label, value, onChange, textarea, placeholder }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs font-semibold text-slate-500 mb-1">{label}</span>
      {textarea ? (
        <textarea
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function TagList({ label, items, onChange }) {
  const update = (i, v) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, ""]);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="block text-xs font-semibold text-slate-500">{label}</span>
        <button
          type="button"
          onClick={add}
          className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-xs"
        >
          <Plus size={14} /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              className="flex-1 rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={item}
              onChange={(e) => update(i, e.target.value)}
            />
            <button type="button" onClick={() => remove(i)} className="text-slate-400 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({ children }) {
  return (
    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700 mt-6 mb-2 pb-1 border-b border-slate-200">
      {children}
    </h3>
  );
}

/* -------------------------- PREVIEW BUILDING BLOCKS -------------------------- */

const bulletsOf = (text) => text.split("\n").filter(Boolean);

function Photo({ data, shape = "circle", size = 112, ring, fallbackBg = "#94a3b8", fallbackIcon = "#e2e8f0" }) {
  const radius = shape === "circle" ? "9999px" : shape === "square" ? "8px" : "0px";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: "hidden",
        background: fallbackBg,
        border: ring ? `4px solid ${ring}` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {data.photo ? (
        <img src={data.photo} alt={data.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <User size={size * 0.42} color={fallbackIcon} />
      )}
    </div>
  );
}

function ExpBlock({ exp, headingStyle, subStyle, bulletStyle, dateStyle }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={headingStyle}>{exp.role}</p>
      <div style={{ display: "flex", justifyContent: "space-between", ...subStyle }}>
        <span>{exp.company}</span>
        <span style={dateStyle}>{exp.start} – {exp.end}</span>
      </div>
      <ul style={{ listStyle: "disc", marginLeft: 16, marginTop: 4, ...bulletStyle }}>
        {bulletsOf(exp.bullets).map((b, i) => (
          <li key={i} style={{ marginBottom: 2 }}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function EduBlock({ ed, headingStyle, subStyle, dateStyle }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <p style={headingStyle}>{ed.degree}</p>
      <div style={{ display: "flex", justifyContent: "space-between", ...subStyle }}>
        <span>{ed.school}</span>
        <span style={dateStyle}>{ed.start} – {ed.end}</span>
      </div>
    </div>
  );
}

function Pills({ items, style, dotColor }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {items.map((s, i) => (
        <span key={i} style={style}>
          {dotColor && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 9999, background: dotColor, marginRight: 6 }} />}
          {s}
        </span>
      ))}
    </div>
  );
}

function DotList({ items, style }) {
  return (
    <ul style={{ ...style, listStyle: "disc", marginLeft: 16 }}>
      {items.map((s, i) => (
        <li key={i} style={{ marginBottom: 3 }}>{s}</li>
      ))}
    </ul>
  );
}

const PAGE = { width: "100%", maxWidth: 650, minHeight: 900, background: "#fff" };

/* -------------------------- TEMPLATE 1: Classic Dark Sidebar -------------------------- */
function TplClassicDark({ data }) {
  return (
    <div id="resume-preview" style={{ ...PAGE, display: "flex" }}>
      <div style={{ background: "#1e2836", color: "#fff", width: "36%", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <Photo data={data} shape="circle" size={112} />
        </div>
        <h4 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 15, borderBottom: "1px solid #64748b", paddingBottom: 4, marginBottom: 8 }}>Contact</h4>
        <div style={{ fontSize: 11, lineHeight: 1.6, marginBottom: 16 }}>
          <p style={{ fontWeight: 600, marginTop: 8 }}>Address</p><p style={{ color: "#cbd5e1" }}>{data.address}</p>
          <p style={{ fontWeight: 600, marginTop: 8 }}>Phone</p><p style={{ color: "#cbd5e1" }}>{data.phone}</p>
          <p style={{ fontWeight: 600, marginTop: 8 }}>Email</p><p style={{ color: "#cbd5e1" }}>{data.email}</p>
        </div>
        <h4 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 15, borderBottom: "1px solid #64748b", paddingBottom: 4, marginBottom: 8, marginTop: 20 }}>Skills</h4>
        <DotList items={data.skills} style={{ fontSize: 11, color: "#e2e8f0", marginBottom: 16 }} />
        <h4 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 15, borderBottom: "1px solid #64748b", paddingBottom: 4, marginBottom: 8, marginTop: 20 }}>Languages</h4>
        <DotList items={data.languages} style={{ fontSize: 11, color: "#e2e8f0", marginBottom: 16 }} />
        <h4 style={{ fontWeight: 700, textTransform: "uppercase", fontSize: 15, borderBottom: "1px solid #64748b", paddingBottom: 4, marginBottom: 8, marginTop: 20 }}>Hobbies</h4>
        <DotList items={data.hobbies} style={{ fontSize: 11, color: "#e2e8f0" }} />
      </div>
      <div style={{ flex: 1, padding: "32px 28px" }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{data.name}</h1>
        <p style={{ fontSize: 18, color: "#475569", marginBottom: 20 }}>{data.title}</p>
        <h3 style={{ fontSize: 16, fontWeight: 700, borderBottom: "4px solid #1e293b", display: "inline-block", paddingBottom: 4, marginBottom: 8 }}>Profile</h3>
        <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.6, marginBottom: 20, textAlign: "justify" }}>{data.profile}</p>
        <h3 style={{ fontSize: 16, fontWeight: 700, borderBottom: "4px solid #1e293b", display: "inline-block", paddingBottom: 4, marginBottom: 8 }}>Work Experience</h3>
        {data.experience.map((exp) => (
          <ExpBlock key={exp.id} exp={exp}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}
            subStyle={{ fontSize: 11, color: "#475569" }}
            bulletStyle={{ fontSize: 11, color: "#334155" }} />
        ))}
        <h3 style={{ fontSize: 16, fontWeight: 700, borderBottom: "4px solid #1e293b", display: "inline-block", paddingBottom: 4, marginBottom: 8, marginTop: 8 }}>Education</h3>
        {data.education.map((ed) => (
          <EduBlock key={ed.id} ed={ed}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}
            subStyle={{ fontSize: 11, color: "#475569" }} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 2: Minimal Clean -------------------------- */
function TplMinimal({ data }) {
  return (
    <div id="resume-preview" style={{ ...PAGE, padding: "40px 44px", fontFamily: "Helvetica, Arial, sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <Photo data={data} shape="circle" size={80} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: 2, color: "#111827" }}>{data.name.toUpperCase()}</h1>
        <p style={{ fontSize: 13, letterSpacing: 3, color: "#6b7280", textTransform: "uppercase" }}>{data.title}</p>
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 8 }}>{data.address} • {data.phone} • {data.email}</div>
        <div style={{ height: 1, background: "#e5e7eb", marginTop: 20 }} />
      </div>
      <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.7, textAlign: "center", marginBottom: 24 }}>{data.profile}</p>

      <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#111827", textAlign: "center", marginBottom: 12 }}>EXPERIENCE</h3>
      {data.experience.map((exp) => (
        <ExpBlock key={exp.id} exp={exp}
          headingStyle={{ fontSize: 13, fontWeight: 700, color: "#111827" }}
          subStyle={{ fontSize: 11, color: "#6b7280", fontStyle: "italic" }}
          bulletStyle={{ fontSize: 11, color: "#374151" }} />
      ))}

      <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#111827", textAlign: "center", margin: "20px 0 12px" }}>EDUCATION</h3>
      {data.education.map((ed) => (
        <EduBlock key={ed.id} ed={ed}
          headingStyle={{ fontSize: 13, fontWeight: 700, color: "#111827" }}
          subStyle={{ fontSize: 11, color: "#6b7280", fontStyle: "italic" }} />
      ))}

      <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#111827", textAlign: "center", margin: "20px 0 12px" }}>SKILLS</h3>
      <Pills items={data.skills} style={{ border: "1px solid #d1d5db", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "#374151" }} />
      <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#111827", textAlign: "center", margin: "20px 0 12px" }}>LANGUAGES & INTERESTS</h3>
      <Pills items={[...data.languages, ...data.hobbies]} style={{ border: "1px solid #d1d5db", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "#374151" }} />
    </div>
  );
}

/* -------------------------- TEMPLATE 3: Light Sidebar Right -------------------------- */
function TplLightRight({ data }) {
  return (
    <div id="resume-preview" style={{ ...PAGE, display: "flex" }}>
      <div style={{ flex: 1, padding: "32px 28px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1e293b" }}>{data.name}</h1>
        <p style={{ fontSize: 16, color: "#64748b", marginBottom: 20 }}>{data.title}</p>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#334155", marginBottom: 8 }}>Profile</h3>
        <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.6, marginBottom: 20 }}>{data.profile}</p>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#334155", marginBottom: 8 }}>Work Experience</h3>
        {data.experience.map((exp) => (
          <ExpBlock key={exp.id} exp={exp}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}
            subStyle={{ fontSize: 11, color: "#64748b" }}
            bulletStyle={{ fontSize: 11, color: "#475569" }} />
        ))}
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#334155", marginBottom: 8, marginTop: 8 }}>Education</h3>
        {data.education.map((ed) => (
          <EduBlock key={ed.id} ed={ed}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}
            subStyle={{ fontSize: 11, color: "#64748b" }} />
        ))}
      </div>
      <div style={{ background: "#f1f5f9", color: "#1e293b", width: "34%", padding: "32px 22px", borderLeft: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <Photo data={data} shape="circle" size={100} ring="#cbd5e1" fallbackBg="#cbd5e1" fallbackIcon="#f8fafc" />
        </div>
        <h4 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", color: "#0f172a", marginBottom: 8 }}>Contact</h4>
        <div style={{ fontSize: 11, lineHeight: 1.6, marginBottom: 16, color: "#334155" }}>
          <p>{data.address}</p><p>{data.phone}</p><p>{data.email}</p>
        </div>
        <h4 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", color: "#0f172a", marginBottom: 8 }}>Skills</h4>
        <DotList items={data.skills} style={{ fontSize: 11, color: "#334155", marginBottom: 16 }} />
        <h4 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", color: "#0f172a", marginBottom: 8 }}>Languages</h4>
        <DotList items={data.languages} style={{ fontSize: 11, color: "#334155", marginBottom: 16 }} />
        <h4 style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", color: "#0f172a", marginBottom: 8 }}>Hobbies</h4>
        <DotList items={data.hobbies} style={{ fontSize: 11, color: "#334155" }} />
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 4: Banner Header -------------------------- */
function TplBanner({ data }) {
  return (
    <div id="resume-preview" style={PAGE}>
      <div style={{ background: "#0f766e", color: "#fff", padding: "28px 32px", display: "flex", alignItems: "center", gap: 18 }}>
        <Photo data={data} shape="circle" size={84} ring="#fff" />
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>{data.name}</h1>
          <p style={{ fontSize: 14, opacity: 0.9 }}>{data.title}</p>
          <p style={{ fontSize: 10, opacity: 0.85, marginTop: 4 }}>{data.address} • {data.phone} • {data.email}</p>
        </div>
      </div>
      <div style={{ display: "flex", padding: "24px 28px", gap: 24 }}>
        <div style={{ width: "34%" }}>
          <h4 style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", color: "#0f766e", marginBottom: 8 }}>Skills</h4>
          <DotList items={data.skills} style={{ fontSize: 11, color: "#374151", marginBottom: 16 }} />
          <h4 style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", color: "#0f766e", marginBottom: 8 }}>Languages</h4>
          <DotList items={data.languages} style={{ fontSize: 11, color: "#374151", marginBottom: 16 }} />
          <h4 style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", color: "#0f766e", marginBottom: 8 }}>Hobbies</h4>
          <DotList items={data.hobbies} style={{ fontSize: 11, color: "#374151" }} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f766e", marginBottom: 6 }}>Profile</h3>
          <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, marginBottom: 18 }}>{data.profile}</p>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f766e", marginBottom: 6 }}>Work Experience</h3>
          {data.experience.map((exp) => (
            <ExpBlock key={exp.id} exp={exp}
              headingStyle={{ fontSize: 13, fontWeight: 700, color: "#111827" }}
              subStyle={{ fontSize: 11, color: "#6b7280" }}
              bulletStyle={{ fontSize: 11, color: "#374151" }} />
          ))}
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f766e", marginBottom: 6, marginTop: 8 }}>Education</h3>
          {data.education.map((ed) => (
            <EduBlock key={ed.id} ed={ed}
              headingStyle={{ fontSize: 13, fontWeight: 700, color: "#111827" }}
              subStyle={{ fontSize: 11, color: "#6b7280" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 5: Timeline -------------------------- */
function TplTimeline({ data }) {
  const items = [
    ...data.experience.map((e) => ({ ...e, kind: "exp" })),
    ...data.education.map((e) => ({ ...e, kind: "edu" })),
  ];
  return (
    <div id="resume-preview" style={{ ...PAGE, padding: "36px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <Photo data={data} shape="circle" size={72} />
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827" }}>{data.name}</h1>
          <p style={{ fontSize: 14, color: "#6b7280" }}>{data.title}</p>
        </div>
      </div>
      <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{data.address} | {data.phone} | {data.email}</p>
      <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.6, margin: "12px 0 20px" }}>{data.profile}</p>

      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12 }}>Timeline</h3>
      <div style={{ position: "relative", paddingLeft: 20, borderLeft: "2px solid #d1d5db" }}>
        {items.map((it, idx) => (
          <div key={idx} style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: -25, top: 2, width: 10, height: 10, borderRadius: 9999, background: it.kind === "exp" ? "#4f46e5" : "#f59e0b" }} />
            <p style={{ fontSize: 10, color: "#9ca3af" }}>{it.start} – {it.end}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{it.kind === "exp" ? it.role : it.degree}</p>
            <p style={{ fontSize: 11, color: "#6b7280" }}>{it.kind === "exp" ? it.company : it.school}</p>
            {it.kind === "exp" && (
              <ul style={{ listStyle: "disc", marginLeft: 16, marginTop: 4 }}>
                {bulletsOf(it.bullets).map((b, i) => (
                  <li key={i} style={{ fontSize: 11, color: "#374151", marginBottom: 2 }}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Skills</h4>
          <Pills items={data.skills} style={{ background: "#eef2ff", color: "#4338ca", borderRadius: 6, padding: "2px 8px", fontSize: 10 }} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Languages / Hobbies</h4>
          <Pills items={[...data.languages, ...data.hobbies]} style={{ background: "#fffbeb", color: "#b45309", borderRadius: 6, padding: "2px 8px", fontSize: 10 }} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 6: Elegant Serif -------------------------- */
function TplElegantSerif({ data }) {
  const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };
  return (
    <div id="resume-preview" style={{ ...PAGE, display: "flex", background: "#FAF7F0", ...serif }}>
      <div style={{ width: "32%", padding: "32px 22px", borderRight: "1px solid #e7dfcf" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <Photo data={data} shape="circle" size={96} ring="#B08D57" fallbackBg="#e7dfcf" fallbackIcon="#fff" />
        </div>
        <h4 style={{ fontSize: 13, letterSpacing: 1, color: "#B08D57", borderBottom: "1px solid #e7dfcf", paddingBottom: 4, marginBottom: 8 }}>Contact</h4>
        <div style={{ fontSize: 11, color: "#4b3f2f", lineHeight: 1.7, marginBottom: 16 }}>
          <p>{data.address}</p><p>{data.phone}</p><p>{data.email}</p>
        </div>
        <h4 style={{ fontSize: 13, letterSpacing: 1, color: "#B08D57", borderBottom: "1px solid #e7dfcf", paddingBottom: 4, marginBottom: 8 }}>Skills</h4>
        <p style={{ fontSize: 11, color: "#4b3f2f", lineHeight: 1.8, marginBottom: 16 }}>{data.skills.join(" · ")}</p>
        <h4 style={{ fontSize: 13, letterSpacing: 1, color: "#B08D57", borderBottom: "1px solid #e7dfcf", paddingBottom: 4, marginBottom: 8 }}>Languages</h4>
        <p style={{ fontSize: 11, color: "#4b3f2f", lineHeight: 1.8, marginBottom: 16 }}>{data.languages.join(" · ")}</p>
        <h4 style={{ fontSize: 13, letterSpacing: 1, color: "#B08D57", borderBottom: "1px solid #e7dfcf", paddingBottom: 4, marginBottom: 8 }}>Hobbies</h4>
        <p style={{ fontSize: 11, color: "#4b3f2f", lineHeight: 1.8 }}>{data.hobbies.join(" · ")}</p>
      </div>
      <div style={{ flex: 1, padding: "36px 30px" }}>
        <h1 style={{ fontSize: 30, color: "#2c2417", marginBottom: 2 }}>{data.name}</h1>
        <p style={{ fontSize: 15, color: "#B08D57", fontStyle: "italic", marginBottom: 20 }}>{data.title}</p>
        <h3 style={{ fontSize: 15, color: "#2c2417", borderBottom: "1px solid #e7dfcf", paddingBottom: 4, marginBottom: 8 }}>Profile</h3>
        <p style={{ fontSize: 12, color: "#4b3f2f", lineHeight: 1.8, marginBottom: 20 }}>{data.profile}</p>
        <h3 style={{ fontSize: 15, color: "#2c2417", borderBottom: "1px solid #e7dfcf", paddingBottom: 4, marginBottom: 8 }}>Work Experience</h3>
        {data.experience.map((exp) => (
          <ExpBlock key={exp.id} exp={exp}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#2c2417" }}
            subStyle={{ fontSize: 11, color: "#8a7a5c", fontStyle: "italic" }}
            bulletStyle={{ fontSize: 11, color: "#4b3f2f" }} />
        ))}
        <h3 style={{ fontSize: 15, color: "#2c2417", borderBottom: "1px solid #e7dfcf", paddingBottom: 4, marginBottom: 8, marginTop: 8 }}>Education</h3>
        {data.education.map((ed) => (
          <EduBlock key={ed.id} ed={ed}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#2c2417" }}
            subStyle={{ fontSize: 11, color: "#8a7a5c", fontStyle: "italic" }} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 7: Corporate Blue -------------------------- */
function TplCorporateBlue({ data }) {
  return (
    <div id="resume-preview" style={{ ...PAGE, display: "flex" }}>
      <div style={{ width: "33%", background: "#EFF6FF", padding: "32px 22px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <Photo data={data} shape="square" size={104} ring="#1D4ED8" fallbackBg="#bfdbfe" fallbackIcon="#1D4ED8" />
        </div>
        <h4 style={{ fontSize: 12, fontWeight: 700, color: "#1E3A8A", textTransform: "uppercase", marginBottom: 8 }}>Contact</h4>
        <div style={{ fontSize: 11, color: "#1e40af", lineHeight: 1.6, marginBottom: 16 }}>
          <p>{data.address}</p><p>{data.phone}</p><p>{data.email}</p>
        </div>
        <h4 style={{ fontSize: 12, fontWeight: 700, color: "#1E3A8A", textTransform: "uppercase", marginBottom: 8 }}>Skills</h4>
        <div style={{ marginBottom: 16 }}>
          {data.skills.map((s, i) => (
            <div key={i} style={{ fontSize: 11, color: "#1e3a8a", marginBottom: 4 }}>
              <div style={{ height: 5, background: "#bfdbfe", borderRadius: 4, marginBottom: 2 }}>
                <div style={{ height: 5, width: "85%", background: "#1D4ED8", borderRadius: 4 }} />
              </div>
              {s}
            </div>
          ))}
        </div>
        <h4 style={{ fontSize: 12, fontWeight: 700, color: "#1E3A8A", textTransform: "uppercase", marginBottom: 8 }}>Languages</h4>
        <DotList items={data.languages} style={{ fontSize: 11, color: "#1e3a8a", marginBottom: 16 }} />
        <h4 style={{ fontSize: 12, fontWeight: 700, color: "#1E3A8A", textTransform: "uppercase", marginBottom: 8 }}>Hobbies</h4>
        <DotList items={data.hobbies} style={{ fontSize: 11, color: "#1e3a8a" }} />
      </div>
      <div style={{ flex: 1, padding: "32px 28px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1E3A8A" }}>{data.name}</h1>
        <p style={{ fontSize: 15, color: "#1D4ED8", marginBottom: 20, fontWeight: 600 }}>{data.title}</p>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E3A8A", borderLeft: "4px solid #1D4ED8", paddingLeft: 8, marginBottom: 8 }}>Profile</h3>
        <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.6, marginBottom: 20 }}>{data.profile}</p>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E3A8A", borderLeft: "4px solid #1D4ED8", paddingLeft: 8, marginBottom: 8 }}>Work Experience</h3>
        {data.experience.map((exp) => (
          <ExpBlock key={exp.id} exp={exp}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}
            subStyle={{ fontSize: 11, color: "#64748b" }}
            bulletStyle={{ fontSize: 11, color: "#334155" }} />
        ))}
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1E3A8A", borderLeft: "4px solid #1D4ED8", paddingLeft: 8, marginBottom: 8, marginTop: 8 }}>Education</h3>
        {data.education.map((ed) => (
          <EduBlock key={ed.id} ed={ed}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}
            subStyle={{ fontSize: 11, color: "#64748b" }} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 8: Compact Grid -------------------------- */
function TplCompactGrid({ data }) {
  return (
    <div id="resume-preview" style={{ ...PAGE, padding: "28px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid #111827", paddingBottom: 14, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Photo data={data} shape="square" size={64} />
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111827" }}>{data.name}</h1>
            <p style={{ fontSize: 12, color: "#6b7280" }}>{data.title}</p>
          </div>
        </div>
        <div style={{ fontSize: 10, color: "#6b7280", textAlign: "right" }}>
          <p>{data.address}</p><p>{data.phone}</p><p>{data.email}</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#111827", marginBottom: 6 }}>Skills</h4>
          <Pills items={data.skills} style={{ background: "#f3f4f6", borderRadius: 4, padding: "2px 8px", fontSize: 10, color: "#111827" }} />
          <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#111827", margin: "14px 0 6px" }}>Languages</h4>
          <Pills items={data.languages} style={{ background: "#f3f4f6", borderRadius: 4, padding: "2px 8px", fontSize: 10, color: "#111827" }} />
          <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#111827", margin: "14px 0 6px" }}>Hobbies</h4>
          <Pills items={data.hobbies} style={{ background: "#f3f4f6", borderRadius: 4, padding: "2px 8px", fontSize: 10, color: "#111827" }} />
          <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#111827", margin: "14px 0 6px" }}>Education</h4>
          {data.education.map((ed) => (
            <EduBlock key={ed.id} ed={ed}
              headingStyle={{ fontSize: 11, fontWeight: 700, color: "#111827" }}
              subStyle={{ fontSize: 9, color: "#6b7280", flexDirection: "column" }} />
          ))}
        </div>
        <div>
          <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#111827", marginBottom: 6 }}>Profile</h4>
          <p style={{ fontSize: 11, color: "#374151", lineHeight: 1.6, marginBottom: 14 }}>{data.profile}</p>
          <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#111827", marginBottom: 6 }}>Experience</h4>
          {data.experience.map((exp) => (
            <ExpBlock key={exp.id} exp={exp}
              headingStyle={{ fontSize: 12, fontWeight: 700, color: "#111827" }}
              subStyle={{ fontSize: 10, color: "#6b7280" }}
              bulletStyle={{ fontSize: 10, color: "#374151" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 9: Creative Teal -------------------------- */
function TplCreativeTeal({ data }) {
  return (
    <div id="resume-preview" style={{ ...PAGE, display: "flex" }}>
      <div style={{ width: "35%", background: "linear-gradient(180deg, #0F766E 0%, #115e59 100%)", color: "#fff", padding: "32px 22px", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <Photo data={data} shape="square" size={100} ring="#fff" />
        </div>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, background: "#5eead4", borderRadius: 9999 }} /> Contact
        </h4>
        <div style={{ fontSize: 11, lineHeight: 1.7, marginBottom: 18, color: "#d1fae5" }}>
          <p>{data.address}</p><p>{data.phone}</p><p>{data.email}</p>
        </div>
        <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, background: "#5eead4", borderRadius: 9999 }} /> Skills
        </h4>
        <Pills items={data.skills} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "3px 10px", fontSize: 10, marginBottom: 4 }} />
        <h4 style={{ fontSize: 13, fontWeight: 700, margin: "18px 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, background: "#5eead4", borderRadius: 9999 }} /> Languages
        </h4>
        <Pills items={data.languages} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "3px 10px", fontSize: 10 }} />
        <h4 style={{ fontSize: 13, fontWeight: 700, margin: "18px 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, background: "#5eead4", borderRadius: 9999 }} /> Hobbies
        </h4>
        <Pills items={data.hobbies} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "3px 10px", fontSize: 10 }} />
      </div>
      <div style={{ flex: 1, padding: "32px 28px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{data.name}</h1>
        <p style={{ fontSize: 15, color: "#0F766E", fontWeight: 600, marginBottom: 20 }}>{data.title}</p>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0F766E", marginBottom: 8 }}>Profile</h3>
        <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.6, marginBottom: 20 }}>{data.profile}</p>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0F766E", marginBottom: 8 }}>Work Experience</h3>
        {data.experience.map((exp) => (
          <ExpBlock key={exp.id} exp={exp}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}
            subStyle={{ fontSize: 11, color: "#64748b" }}
            bulletStyle={{ fontSize: 11, color: "#334155" }} />
        ))}
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0F766E", marginBottom: 8, marginTop: 8 }}>Education</h3>
        {data.education.map((ed) => (
          <EduBlock key={ed.id} ed={ed}
            headingStyle={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}
            subStyle={{ fontSize: 11, color: "#64748b" }} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 10: Monochrome Boxed -------------------------- */
function TplMonochrome({ data }) {
  const box = { border: "1px solid #111827", padding: 14, marginBottom: 14 };
  return (
    <div id="resume-preview" style={{ ...PAGE, padding: "28px", background: "#fff" }}>
      <div style={{ ...box, display: "flex", alignItems: "center", gap: 16 }}>
        <Photo data={data} shape="square" size={72} fallbackBg="#111827" fallbackIcon="#fff" />
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, textTransform: "uppercase", letterSpacing: 1, color: "#111827" }}>{data.name}</h1>
          <p style={{ fontSize: 12, color: "#374151", textTransform: "uppercase", letterSpacing: 2 }}>{data.title}</p>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 10, color: "#374151", textAlign: "right" }}>
          <p>{data.address}</p><p>{data.phone}</p><p>{data.email}</p>
        </div>
      </div>
      <div style={box}>
        <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Profile</h3>
        <p style={{ fontSize: 11, color: "#374151", lineHeight: 1.6 }}>{data.profile}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, marginBottom: 14 }}>
        <div style={{ border: "1px solid #111827", borderRight: "none", padding: 12 }}>
          <h4 style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 6 }}>Skills</h4>
          <p style={{ fontSize: 10, color: "#374151", lineHeight: 1.7 }}>{data.skills.join(", ")}</p>
        </div>
        <div style={{ border: "1px solid #111827", borderRight: "none", padding: 12 }}>
          <h4 style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 6 }}>Languages</h4>
          <p style={{ fontSize: 10, color: "#374151", lineHeight: 1.7 }}>{data.languages.join(", ")}</p>
        </div>
        <div style={{ border: "1px solid #111827", padding: 12 }}>
          <h4 style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", marginBottom: 6 }}>Hobbies</h4>
          <p style={{ fontSize: 10, color: "#374151", lineHeight: 1.7 }}>{data.hobbies.join(", ")}</p>
        </div>
      </div>
      <div style={box}>
        <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Work Experience</h3>
        {data.experience.map((exp) => (
          <ExpBlock key={exp.id} exp={exp}
            headingStyle={{ fontSize: 12, fontWeight: 700, color: "#111827", textTransform: "uppercase" }}
            subStyle={{ fontSize: 10, color: "#4b5563" }}
            bulletStyle={{ fontSize: 10, color: "#374151" }} />
        ))}
      </div>
      <div style={{ ...box, marginBottom: 0 }}>
        <h3 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Education</h3>
        {data.education.map((ed) => (
          <EduBlock key={ed.id} ed={ed}
            headingStyle={{ fontSize: 12, fontWeight: 700, color: "#111827", textTransform: "uppercase" }}
            subStyle={{ fontSize: 10, color: "#4b5563" }} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE 11: Tech Terminal -------------------------- */
function TplTerminal({ data }) {
  const mono = { fontFamily: "'Courier New', Consolas, monospace" };
  const head = (t) => (
    <h3 style={{ fontSize: 13, fontWeight: 700, color: "#22D3EE", marginBottom: 8, ...mono }}>
      <span style={{ color: "#4ade80" }}>{"> "}</span>{t}
    </h3>
  );
  return (
    <div id="resume-preview" style={{ ...PAGE, display: "flex", background: "#0B0F19", color: "#e2e8f0", ...mono }}>
      <div style={{ width: "34%", background: "#111827", padding: "28px 20px", borderRight: "1px solid #1f2937" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <Photo data={data} shape="square" size={96} ring="#22D3EE" fallbackBg="#1f2937" fallbackIcon="#22D3EE" />
        </div>
        {head("contact")}
        <div style={{ fontSize: 10, lineHeight: 1.8, marginBottom: 16, color: "#94a3b8" }}>
          <p>addr: {data.address}</p><p>tel: {data.phone}</p><p>mail: {data.email}</p>
        </div>
        {head("skills")}
        <DotList items={data.skills} style={{ fontSize: 10, color: "#94a3b8", marginBottom: 16 }} />
        {head("languages")}
        <DotList items={data.languages} style={{ fontSize: 10, color: "#94a3b8", marginBottom: 16 }} />
        {head("hobbies")}
        <DotList items={data.hobbies} style={{ fontSize: 10, color: "#94a3b8" }} />
      </div>
      <div style={{ flex: 1, padding: "28px 26px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#f8fafc" }}>{data.name}</h1>
        <p style={{ fontSize: 13, color: "#4ade80", marginBottom: 18 }}>{"// " + data.title}</p>
        {head("profile")}
        <p style={{ fontSize: 11, color: "#cbd5e1", lineHeight: 1.7, marginBottom: 18 }}>{data.profile}</p>
        {head("experience")}
        {data.experience.map((exp) => (
          <ExpBlock key={exp.id} exp={exp}
            headingStyle={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}
            subStyle={{ fontSize: 10, color: "#64748b" }}
            bulletStyle={{ fontSize: 10, color: "#cbd5e1" }} />
        ))}
        {head("education")}
        {data.education.map((ed) => (
          <EduBlock key={ed.id} ed={ed}
            headingStyle={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}
            subStyle={{ fontSize: 10, color: "#64748b" }} />
        ))}
      </div>
    </div>
  );
}

/* -------------------------- TEMPLATE REGISTRY -------------------------- */
const TEMPLATES = [
  { id: "classic-dark", name: "Classic Dark", swatch: "#1e2836", Component: TplClassicDark },
  { id: "minimal", name: "Minimal Clean", swatch: "#e5e7eb", Component: TplMinimal },
  { id: "light-right", name: "Light Sidebar", swatch: "#94a3b8", Component: TplLightRight },
  { id: "banner", name: "Banner Header", swatch: "#0f766e", Component: TplBanner },
  { id: "timeline", name: "Timeline", swatch: "#4f46e5", Component: TplTimeline },
  { id: "elegant", name: "Elegant Serif", swatch: "#B08D57", Component: TplElegantSerif },
  { id: "corporate", name: "Corporate Blue", swatch: "#1D4ED8", Component: TplCorporateBlue },
  { id: "grid", name: "Compact Grid", swatch: "#111827", Component: TplCompactGrid },
  { id: "creative", name: "Creative Teal", swatch: "#0F766E", Component: TplCreativeTeal },
  { id: "mono", name: "Monochrome", swatch: "#000000", Component: TplMonochrome },
  { id: "terminal", name: "Tech Terminal", swatch: "#22D3EE", Component: TplTerminal },
];

/* -------------------------------- MAIN APP -------------------------------- */

export default function ResumeBuilder() {
  const [data, setData] = useState(initialState);
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id);
  const fileInputRef = useRef(null);

  const set = (key) => (val) => setData((d) => ({ ...d, [key]: val }));

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((d) => ({ ...d, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const updateExperience = (id, key, value) =>
    setData((d) => ({ ...d, experience: d.experience.map((x) => (x.id === id ? { ...x, [key]: value } : x)) }));
  const addExperience = () =>
    setData((d) => ({ ...d, experience: [...d.experience, { id: uid(), role: "", company: "", start: "", end: "", bullets: "" }] }));
  const removeExperience = (id) => setData((d) => ({ ...d, experience: d.experience.filter((x) => x.id !== id) }));

  const updateEducation = (id, key, value) =>
    setData((d) => ({ ...d, education: d.education.map((x) => (x.id === id ? { ...x, [key]: value } : x)) }));
  const addEducation = () =>
    setData((d) => ({ ...d, education: [...d.education, { id: uid(), degree: "", school: "", start: "", end: "" }] }));
  const removeEducation = (id) => setData((d) => ({ ...d, education: d.education.filter((x) => x.id !== id) }));

  const handleDownload = () => window.print();

  const Selected = TEMPLATES.find((t) => t.id === templateId)?.Component ?? TplClassicDark;

  return (
    <div className="min-h-screen bg-slate-100">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 210mm;
            min-height: 297mm;
            margin: 0;
            box-shadow: none !important;
          }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between print:hidden">
        <h1 className="text-xl font-bold text-slate-800">Resume Builder</h1>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-sm"
        >
          <Download size={16} /> Download Resume
        </button>
      </div>

      {/* TEMPLATE PICKER */}
      <div className="max-w-7xl mx-auto px-4 pb-4 print:hidden">
        <span className="block text-xs font-semibold text-slate-500 mb-2">Choose a template ({TEMPLATES.length})</span>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplateId(t.id)}
              className={`flex items-center gap-2 shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                templateId === t.id
                  ? "border-slate-800 bg-slate-800 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
              }`}
            >
              <span
                className="w-3 h-3 rounded-full border border-black/10"
                style={{ background: t.swatch }}
              />
              {t.name}
              {templateId === t.id && <Check size={12} />}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
        {/* FORM */}
        <div className="bg-white rounded-lg shadow-sm p-5 print:hidden overflow-y-auto max-h-[85vh]">
          <SectionHeader>Basics</SectionHeader>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center border border-slate-300">
              {data.photo ? (
                <img src={data.photo} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <User className="text-slate-400" size={28} />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-sm border border-slate-300 rounded-md px-3 py-1.5 hover:bg-slate-50"
            >
              <Upload size={14} /> Upload photo
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          </div>
          <Field label="Full name" value={data.name} onChange={set("name")} />
          <Field label="Job title" value={data.title} onChange={set("title")} />

          <SectionHeader>Contact</SectionHeader>
          <Field label="Address" value={data.address} onChange={set("address")} />
          <Field label="Phone" value={data.phone} onChange={set("phone")} />
          <Field label="Email" value={data.email} onChange={set("email")} />

          <SectionHeader>Profile</SectionHeader>
          <Field label="Summary" value={data.profile} onChange={set("profile")} textarea />

          <SectionHeader>Skills</SectionHeader>
          <TagList label="Skills" items={data.skills} onChange={set("skills")} />

          <SectionHeader>Languages</SectionHeader>
          <TagList label="Languages" items={data.languages} onChange={set("languages")} />

          <SectionHeader>Hobbies</SectionHeader>
          <TagList label="Hobbies" items={data.hobbies} onChange={set("hobbies")} />

          <SectionHeader>Work Experience</SectionHeader>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id} className="border border-slate-200 rounded-md p-3 relative">
                <button type="button" onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
                <Field label="Role" value={exp.role} onChange={(v) => updateExperience(exp.id, "role", v)} />
                <Field label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, "company", v)} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start date" value={exp.start} onChange={(v) => updateExperience(exp.id, "start", v)} />
                  <Field label="End date" value={exp.end} onChange={(v) => updateExperience(exp.id, "end", v)} />
                </div>
                <Field label="Achievements (one per line)" value={exp.bullets} onChange={(v) => updateExperience(exp.id, "bullets", v)} textarea />
              </div>
            ))}
          </div>
          <button type="button" onClick={addExperience} className="mt-3 flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 font-semibold">
            <Plus size={14} /> Add experience
          </button>

          <SectionHeader>Education</SectionHeader>
          <div className="space-y-4">
            {data.education.map((ed) => (
              <div key={ed.id} className="border border-slate-200 rounded-md p-3 relative">
                <button type="button" onClick={() => removeEducation(ed.id)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
                <Field label="Degree" value={ed.degree} onChange={(v) => updateEducation(ed.id, "degree", v)} />
                <Field label="School" value={ed.school} onChange={(v) => updateEducation(ed.id, "school", v)} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start date" value={ed.start} onChange={(v) => updateEducation(ed.id, "start", v)} />
                  <Field label="End date" value={ed.end} onChange={(v) => updateEducation(ed.id, "end", v)} />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addEducation} className="mt-3 flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 font-semibold">
            <Plus size={14} /> Add education
          </button>
        </div>

        {/* PREVIEW */}
        <div className="flex justify-center print:block">
          <div className="shadow-lg print:shadow-none" style={{ width: "100%", maxWidth: 650 }}>
            <Selected data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}