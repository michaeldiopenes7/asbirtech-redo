import { Link } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'
import { insights } from '../../content/insights'
import InsightCard from '../InsightCard'
import './Insights.css'

export default function Insights() {
  return (
    <section id="articles" className="insights" aria-labelledby="insights-heading">
      <div className="container">

        <div className="insights-top" data-reveal>
          <div className="insights-header">
            <h2 id="insights-heading" className="insights-headline">
              Latest articles &amp;<br />industry insights
            </h2>
          </div>
          <Link to="/articles" className="insights-view-all insights-view-all--desktop">
            View more Articles <LuArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div className="insights-grid">
          {insights.slice(0, 3).map((post, i) => (
            <div key={post.id} data-reveal data-reveal-delay={i * 100}>
              <InsightCard post={post} />
            </div>
          ))}
        </div>

        <div className="insights-footer" data-reveal>
          <Link to="/articles" className="insights-view-all insights-view-all--mobile">
            View more Articles <LuArrowUpRight aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  )
}
