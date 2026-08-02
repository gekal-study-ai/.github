import type { Metadata } from "next";
import { phases, site } from "@/content/data";

export const metadata: Metadata = {
  title: "ロードマップ",
  description:
    "6 つのフェーズごとの学習項目・成果物・完了条件。既存リポジトリの現在地から逆算して組んだ AI 学習の計画。",
};

export default function RoadmapPage() {
  return (
    <div className="wrap">
      <section className="hero">
        <h1>学習ロードマップ</h1>
        <p className="lead">
          6 つのフェーズに分けています。各フェーズには成果物と完了条件があり、
          条件を満たしたら次へ進みます。時期はあくまで目安です。
        </p>
        <div className="heroMeta">
          <a href={site.roadmapUrl} className="btn">
            ROADMAP.md（GitHub）
          </a>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>全体</h2>
          <span className="note">四半期ごとに見直す</span>
        </div>
        <ul className="phaseList">
          {phases.map((phase) => (
            <li key={phase.id}>
              <a href={`#phase-${phase.id}`} className="phaseRow">
                <span className="idx">PHASE {phase.id}</span>
                <span>
                  <h3>{phase.title}</h3>
                  <p>{phase.tagline}</p>
                </span>
                <span className="period">{phase.period}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        {phases.map((phase) => (
          <article
            key={phase.id}
            id={`phase-${phase.id}`}
            className="phaseDetail"
          >
            <div className="head">
              <span className="idx">PHASE {phase.id}</span>
              <h2>{phase.title}</h2>
            </div>
            <p className="tagline">{phase.tagline}</p>

            <div className="metaRow">
              <span>
                <b>目安時期</b>
                {phase.period}
              </span>
              <span>
                <b>新規リポジトリ</b>
                {phase.newRepo ? <code>{phase.newRepo}</code> : "なし"}
              </span>
            </div>

            <div className="blockGrid">
              <div className="block">
                <h4>学ぶこと</h4>
                <ul>
                  {phase.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="block">
                <h4>成果物</h4>
                <ul>
                  {phase.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="block criteria">
                <h4>完了条件</h4>
                <ul>
                  {phase.criteria.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
