import Link from "next/link";
import {
  phases,
  principles,
  repos,
  site,
  statusLabel,
  strengths,
  weaknesses,
} from "@/content/data";

export default function Home() {
  return (
    <div className="wrap">
      <section className="hero">
        <h1>AI を、動かしながら学ぶ。</h1>
        <p className="lead">
          {site.org} は AI
          を学ぶために作った実験リポジトリ群です。まず動かす、制約を測る、わかったことを残す。
          このサイトは、その現在地とこれから進む道筋をまとめたものです。
        </p>
        <div className="heroMeta">
          <Link href="/roadmap/" className="btn primary">
            ロードマップを見る
          </Link>
          <a href={site.orgUrl} className="btn">
            GitHub Organization
          </a>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>リポジトリ</h2>
          <span className="note">1 テーマ 1 リポジトリ</span>
        </div>
        <div className="repoGrid">
          {repos.map((repo) => (
            <article key={repo.name} className="repoCard">
              <div className="top">
                <h3>
                  {repo.url ? <a href={repo.url}>{repo.name}</a> : repo.name}
                </h3>
                <span
                  className={
                    repo.status === "active"
                      ? "tag active"
                      : repo.status === "paused"
                        ? "tag paused"
                        : "tag"
                  }
                >
                  {statusLabel[repo.status]}
                </span>
              </div>
              <div className="theme">{repo.theme}</div>
              <p className="desc">{repo.description}</p>
              <p className="learned">
                <b>得たもの</b>
                <br />
                {repo.learned}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>現在地</h2>
          <span className="note">{site.updatedAt} 時点</span>
        </div>
        <div className="twoCol">
          <div>
            <div className="colTitle">できていること</div>
            <ul className="plainList">
              {strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="colTitle">埋めるべき穴</div>
            {weaknesses.map((item) => (
              <div key={item.title} className="gapItem">
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>進め方</h2>
        </div>
        <div className="principleGrid">
          {principles.map((p, i) => (
            <div key={p.title} className="principle">
              <span className="num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="sectionHead">
          <h2>ロードマップ</h2>
          <span className="note">時期は目安。完了条件を満たしたら次へ</span>
        </div>
        <ul className="phaseList">
          {phases.map((phase) => (
            <li key={phase.id}>
              <Link href={`/roadmap/#phase-${phase.id}`} className="phaseRow">
                <span className="idx">PHASE {phase.id}</span>
                <span>
                  <h3>{phase.title}</h3>
                  <p>{phase.tagline}</p>
                </span>
                <span className="period">{phase.period}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
