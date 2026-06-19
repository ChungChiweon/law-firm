/* 따뜻한 변호사의 서재 — CSS-only 책상 일러스트레이션
   배경: warm cream / oak wood  |  조명: 창문 햇살 + 황금 스탠드
   오브젝트: 판례집 · 가죽노트 · 만년필 · 금테안경 · 도자기 머그잔 */

export function DeskScene() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        height: "500px",
        background: "#f5ede0",
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.24)," +
          "0 4px 16px rgba(0,0,0,0.14)," +
          "0 0 0 1px rgba(180,140,60,0.18)",
      }}
    >
      {/* ══ 배경 레이어 ══ */}

      {/* 창문 햇살 — 좌상단 대각 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(124deg," +
            "rgba(255,252,228,0.94) 0%," +
            "rgba(255,248,208,0.60) 18%," +
            "rgba(255,244,196,0.22) 36%," +
            "transparent 54%)",
        }}
      />

      {/* 스탠드 조명 글로우 — 우상단 황금빛 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 52% at 91% 7%," +
            "rgba(255,198,72,0.42) 0%," +
            "rgba(240,172,44,0.20) 38%," +
            "transparent 64%)",
        }}
      />

      {/* 책상 표면 — warm oak (하단 58%) */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0"
        style={{ top: "42%", bottom: 0, background: "linear-gradient(178deg,#d4a040 0%,#c89030 30%,#bc8228 62%,#ae7620 88%,#a27018 100%)" }}
      >
        {/* 나뭇결 */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "repeating-linear-gradient(97deg,transparent 0px,transparent 7px,rgba(255,255,255,0.055) 7px,rgba(255,255,255,0.055) 8px)," +
              "repeating-linear-gradient(94deg,transparent 0px,transparent 19px,rgba(0,0,0,0.045) 19px,rgba(0,0,0,0.045) 20px)",
          }}
        />
        {/* 책상 앞 모서리 빛 */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "28%", background: "linear-gradient(to bottom,rgba(255,218,96,0.14),transparent)" }} />
      </div>

      {/* 벽→책상 경계 그림자 */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0"
        style={{ top: "40%", height: "9px", background: "linear-gradient(to bottom,rgba(0,0,0,0.13),transparent)" }}
      />

      {/* ══ 스탠드 조명 ══ */}

      {/* 기둥 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", right: "9%", top: "8%", bottom: "58%",
          width: "5px",
          background: "linear-gradient(to right,#b4903a,#d4aa58,#c09040,#ae8030)",
          borderRadius: "3px",
          boxShadow: "1px 0 5px rgba(0,0,0,0.18)",
        }}
      />

      {/* 수평 팔 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", right: "6%", top: "8%",
          width: "14%", height: "5px",
          background: "linear-gradient(to bottom,#d4a848,#b88a30)",
          borderRadius: "3px",
          boxShadow: "0 1px 5px rgba(0,0,0,0.14)",
        }}
      />

      {/* 램프 갓 */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", right: "4%", top: "0%",
          width: "19%", height: "9.5%",
          background: "linear-gradient(175deg,#f0c858 0%,#d4a030 52%,#be9028 100%)",
          clipPath: "polygon(16% 0%,84% 0%,100% 100%,0% 100%)",
          boxShadow: "0 4px 14px rgba(180,130,20,0.32)",
        }}
      >
        <div style={{
          position: "absolute", inset: "5px",
          background: "linear-gradient(175deg,rgba(255,248,180,0.58) 0%,rgba(255,218,90,0.10) 100%)",
          clipPath: "polygon(15% 0%,85% 0%,100% 100%,0% 100%)",
        }} />
      </div>

      {/* ══ 판례집 ══ */}

      <div
        aria-hidden="true"
        className="absolute flex items-end"
        style={{ left: "5%", bottom: "58%", gap: "2px" }}
      >
        {/* 책 1 — 버건디 */}
        <div style={{ position: "relative", width: "22px", height: "122px" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right,#6a1820 3%,#8b2635 15%,#b03046 52%,#9a2a40 86%,#6a1820 100%)",
            borderRadius: "2px 2px 0 0",
            boxShadow: "2px 0 6px rgba(0,0,0,0.22)",
          }}>
            <div style={{ position: "absolute", top: "22px", left: "5px", right: "5px", height: "1px", background: "rgba(255,215,140,0.42)" }} />
            <div style={{ position: "absolute", top: "26px", left: "5px", right: "5px", height: "1px", background: "rgba(255,215,140,0.20)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 60%,rgba(255,200,100,0.13) 100%)", borderRadius: "2px 2px 0 0" }} />
          </div>
          <div style={{ position: "absolute", top: "-5px", left: 0, right: 0, height: "6px", background: "linear-gradient(to bottom,#f5eedd,#e8dcc8)", transform: "skewX(-12deg) translateX(2px)", borderRadius: "1px", boxShadow: "0 -1px 3px rgba(0,0,0,0.10)" }} />
        </div>

        {/* 책 2 — 딥 네이비 */}
        <div style={{ position: "relative", width: "17px", height: "99px" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right,#0f1e3a 3%,#1a2e50 15%,#26405e 52%,#1a2e50 86%,#0f1e3a 100%)",
            borderRadius: "2px 2px 0 0",
            boxShadow: "2px 0 5px rgba(0,0,0,0.20)",
          }}>
            <div style={{ position: "absolute", top: "20px", left: "3px", right: "3px", height: "1px", background: "rgba(200,180,120,0.34)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 60%,rgba(200,180,100,0.10) 100%)", borderRadius: "2px 2px 0 0" }} />
          </div>
          <div style={{ position: "absolute", top: "-5px", left: 0, right: 0, height: "6px", background: "linear-gradient(to bottom,#f5eedd,#e8dcc8)", transform: "skewX(-12deg) translateX(2px)", borderRadius: "1px" }} />
        </div>

        {/* 책 3 — 모스 그린 */}
        <div style={{ position: "relative", width: "20px", height: "109px" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right,#152010 3%,#1e3018 15%,#2c4224 52%,#1e3018 86%,#152010 100%)",
            borderRadius: "2px 2px 0 0",
            boxShadow: "2px 0 5px rgba(0,0,0,0.20)",
          }}>
            <div style={{ position: "absolute", top: "18px", left: "4px", right: "4px", height: "1px", background: "rgba(200,180,120,0.30)" }} />
            <div style={{ position: "absolute", top: "22px", left: "4px", right: "4px", height: "1px", background: "rgba(200,180,120,0.16)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 60%,rgba(200,180,100,0.09) 100%)", borderRadius: "2px 2px 0 0" }} />
          </div>
          <div style={{ position: "absolute", top: "-5px", left: 0, right: 0, height: "6px", background: "linear-gradient(to bottom,#f5eedd,#e8dcc8)", transform: "skewX(-12deg) translateX(2px)", borderRadius: "1px" }} />
        </div>

        {/* 책 4 — 기댄 책 */}
        <div style={{ position: "relative", width: "14px", height: "84px", transform: "rotate(7deg) translateY(-2px)", transformOrigin: "bottom" }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right,#3a1800 3%,#5a2a0c 15%,#7a4018 52%,#5a2a0c 86%,#3a1800 100%)",
            borderRadius: "2px 2px 0 0",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 55%,rgba(220,180,100,0.12) 100%)", borderRadius: "2px 2px 0 0" }} />
          </div>
          <div style={{ position: "absolute", top: "-4px", left: 0, right: 0, height: "5px", background: "linear-gradient(to bottom,#f5eedd,#e8dcc8)", transform: "skewX(-12deg) translateX(1px)", borderRadius: "1px" }} />
        </div>
      </div>

      {/* ══ 열린 가죽 노트 ══ */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "21%", top: "44%",
          width: "57%", height: "35%",
          transform: "rotate(-1.5deg)",
          filter: "drop-shadow(0 6px 18px rgba(100,70,20,0.22)) drop-shadow(0 2px 4px rgba(0,0,0,0.12))",
        }}
      >
        {/* 가죽 커버 */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(145deg,#a06828 0%,#8a5420 56%,#7a4818 100%)", borderRadius: "4px" }} />

        {/* 왼쪽 페이지 */}
        <div style={{
          position: "absolute", top: "4%", bottom: "4%", left: "3%", width: "46%",
          background: "linear-gradient(148deg,#fdf9f0 0%,#f8f2e4 100%)",
          borderRadius: "2px 0 0 2px",
          boxShadow: "inset -2px 0 5px rgba(80,50,20,0.10)",
        }}>
          <div style={{ position: "absolute", top: "10%", left: "8%", width: "32%", height: "1.5px", background: "rgba(170,130,50,0.52)" }} />
          {[78,88,72,84,68,80,64,76].map((w,i) => (
            <div key={i} style={{ position: "absolute", top: `${22+i*9}%`, left: "8%", height: "1px", width: `${w}%`, background: "rgba(90,70,40,0.14)" }} />
          ))}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(148deg,rgba(255,252,228,0.56) 0%,transparent 60%)", borderRadius: "2px 0 0 2px" }} />
        </div>

        {/* 제본선 */}
        <div style={{ position: "absolute", top: "2%", bottom: "2%", left: "49.5%", width: "2.5px", background: "linear-gradient(180deg,#c09050,#9a7030,#c09050)", borderRadius: "1px" }} />

        {/* 오른쪽 페이지 */}
        <div style={{
          position: "absolute", top: "4%", bottom: "4%", right: "3%", width: "46%",
          background: "linear-gradient(148deg,#fbf6ea 0%,#f4edd6 100%)",
          borderRadius: "0 2px 2px 0",
          boxShadow: "inset 2px 0 5px rgba(80,50,20,0.08)",
        }}>
          {[68,84,76,90,62,80,70,58].map((w,i) => (
            <div key={i} style={{ position: "absolute", top: `${14+i*9}%`, left: "8%", height: "1px", width: `${w}%`, background: "rgba(90,70,40,0.12)" }} />
          ))}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left,rgba(255,214,96,0.14) 0%,transparent 62%)", borderRadius: "0 2px 2px 0" }} />
        </div>
      </div>

      {/* ══ 만년필 ══ */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "24%", top: "57%",
          width: "50%", height: "10px",
          borderRadius: "5px 8px 8px 5px",
          background:
            "linear-gradient(to bottom,rgba(255,255,255,0.18) 0%,transparent 35%)," +
            "linear-gradient(to right,#1a1810 0%,#242018 12%,#1e1c18 52%,#c9a040 78%,#b08e30 90%,#d4a848 100%)",
          transform: "rotate(-11deg)",
          transformOrigin: "left center",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.26))",
        }}
      >
        <div style={{ position: "absolute", top: "-2px", left: "15%", width: "40%", height: "3px", background: "linear-gradient(to bottom,#d4a848,#b89030)", borderRadius: "2px" }} />
        <div style={{ position: "absolute", right: "24%", top: 0, bottom: 0, width: "3px", background: "linear-gradient(to bottom,#e0b850,#c9a040)", borderRadius: "1px" }} />
        <div style={{ position: "absolute", right: "20%", top: 0, bottom: 0, width: "2px", background: "linear-gradient(to bottom,#e0b850,#c9a040)", borderRadius: "1px" }} />
        <div style={{ position: "absolute", right: "-11px", top: "1px", width: "13px", height: "8px", background: "linear-gradient(90deg,#c9a040,#e0b850,#c09030)", clipPath: "polygon(0 10%,100% 50%,0 90%)" }} />
        <div style={{ position: "absolute", top: "1.5px", left: "8%", width: "32%", height: "2px", background: "rgba(255,255,255,0.28)", borderRadius: "2px" }} />
      </div>

      {/* ══ 금테 안경 ══ */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "57%", top: "46%",
          transform: "rotate(-4deg)",
          filter: "drop-shadow(0 2px 5px rgba(100,70,20,0.20))",
        }}
      >
        {/* 왼쪽 렌즈 */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: "34px", height: "27px",
          border: "2.5px solid #c9a040", borderRadius: "8px",
          background: "linear-gradient(135deg,rgba(228,244,255,0.32) 0%,rgba(200,228,255,0.12) 100%)",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.52),0 1px 4px rgba(150,110,30,0.15)",
        }}>
          <div style={{ position: "absolute", top: "3px", left: "4px", width: "13px", height: "7px", background: "rgba(255,255,255,0.44)", borderRadius: "50%", transform: "rotate(-18deg)" }} />
        </div>
        {/* 브릿지 */}
        <div style={{ position: "absolute", left: "34px", top: "11px", width: "14px", height: "2.5px", background: "linear-gradient(to right,#c9a040,#e0b850,#c9a040)", borderRadius: "1px" }} />
        {/* 오른쪽 렌즈 */}
        <div style={{
          position: "absolute", left: "48px", top: 0, width: "34px", height: "27px",
          border: "2.5px solid #c9a040", borderRadius: "8px",
          background: "linear-gradient(135deg,rgba(228,244,255,0.32) 0%,rgba(200,228,255,0.12) 100%)",
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.52),0 1px 4px rgba(150,110,30,0.15)",
        }}>
          <div style={{ position: "absolute", top: "3px", left: "4px", width: "13px", height: "7px", background: "rgba(255,255,255,0.44)", borderRadius: "50%", transform: "rotate(-18deg)" }} />
        </div>
        {/* 다리 */}
        <div style={{ position: "absolute", left: "-10px", top: "11px", width: "12px", height: "2.5px", background: "linear-gradient(to left,#c9a040,#a88030)", borderRadius: "1px", transform: "rotate(-5deg)", transformOrigin: "right center" }} />
        <div style={{ position: "absolute", left: "82px", top: "11px", width: "12px", height: "2.5px", background: "linear-gradient(to right,#c9a040,#a88030)", borderRadius: "1px", transform: "rotate(5deg)", transformOrigin: "left center" }} />
      </div>

      {/* ══ 도자기 머그잔 ══ */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute", right: "8%", bottom: "58%",
          filter: "drop-shadow(0 4px 12px rgba(100,70,20,0.22))",
        }}
      >
        {/* 스팀 */}
        <div style={{ position: "absolute", top: "-22px", left: "5px", display: "flex", gap: "8px" }}>
          {[{ h: "13px", o: "0.30" },{ h: "17px", o: "0.20" },{ h: "10px", o: "0.25" }].map((s,i) => (
            <div key={i} style={{ width: "2px", height: s.h, background: `linear-gradient(to top,rgba(180,130,60,${s.o}),transparent)`, borderRadius: "2px" }} />
          ))}
        </div>
        {/* 몸체 — 흰 도자기 */}
        <div style={{
          width: "52px", height: "54px",
          background: "linear-gradient(to right,#ccc8c4 0%,#f2eee8 18%,#ffffff 42%,#eee8e2 76%,#d4cec8 100%)",
          borderRadius: "5px 5px 9px 9px",
          border: "1px solid rgba(0,0,0,0.07)",
          position: "relative",
        }}>
          {/* 커피 표면 */}
          <div style={{
            position: "absolute", top: "-1px", left: "4px", right: "4px", height: "9px", borderRadius: "50%",
            background: "radial-gradient(ellipse at 40% 35%,rgba(190,120,40,0.88) 0%,rgba(130,78,22,0.96) 55%,rgba(84,48,12,1.0) 100%)",
            boxShadow: "inset 0 1px 3px rgba(255,200,80,0.22)",
          }} />
          {/* 하이라이트 */}
          <div style={{ position: "absolute", top: "10px", left: "7px", width: "8px", height: "26px", background: "rgba(255,255,255,0.54)", borderRadius: "5px", filter: "blur(2.5px)" }} />
          {/* 손잡이 */}
          <div style={{ position: "absolute", right: "-14px", top: "10px", width: "12px", height: "26px", border: "2px solid rgba(0,0,0,0.09)", borderLeft: "none", borderRadius: "0 10px 10px 0" }} />
          {/* 접촉 그림자 */}
          <div style={{ position: "absolute", bottom: "-4px", left: "10%", right: "10%", height: "5px", background: "rgba(100,70,20,0.22)", borderRadius: "50%", filter: "blur(3px)" }} />
        </div>
      </div>

      {/* 주변 비네트 (매우 연하게) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 88% 85% at 45% 45%,transparent 42%,rgba(160,110,40,0.07) 100%)" }}
      />

      {/* 하단 캡션 */}
      <div
        className="absolute bottom-0 left-0 right-0 border-t px-5 py-4"
        style={{
          borderColor: "rgba(160,120,60,0.18)",
          background: "linear-gradient(to bottom,transparent,rgba(180,130,40,0.07))",
          backdropFilter: "blur(4px)",
        }}
      >
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-[#8a6820]/65">
          변호사의 서재
        </p>
        <p className="mt-1 text-[0.8125rem] font-semibold text-[#6a5030]">
          당신의 이야기를 들을 준비가 되어 있습니다.
        </p>
      </div>
    </div>
  );
}
