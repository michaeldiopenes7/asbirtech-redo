import { LuArrowUpRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { insights } from '../../content/insights'
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
          {insights.slice(0, 3).map((post, i) => {
            const isExternal = !post.body?.length
            if (isExternal) {
              return (
                <a key={post.id} href={post.href} target="_blank" rel="noopener noreferrer" className="insight-card" data-reveal data-reveal-delay={i * 100}>
                  <div className="insight-card-image">
                    {post.image && <img src={post.image} alt={post.title} />}
                  </div>
                  <div className="insight-card-body">
                    <span className="insight-card-category">{post.category}</span>
                    <h3 className="insight-card-title">{post.title}</h3>
                    <div className="insight-card-author">
                      <div className="insight-card-author-avatar">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="insight-card-author-info">
                        <span className="insight-card-author-name">{post.author.name}</span>
                        <span className="insight-card-author-role">{post.author.role}</span>
                      </div>
                    </div>
                  </div>
                </a>
              )
            }
            return (
              <Link key={post.id} to={`/articles/${post.id}`} className="insight-card" data-reveal data-reveal-delay={i * 100}>
                <div className="insight-card-image">
                  {post.image && <img src={post.image} alt={post.title} />}
                </div>
                <div className="insight-card-body">
                  <span className="insight-card-category">{post.category}</span>
                  <h3 className="insight-card-title">{post.title}</h3>
                  <div className="insight-card-author">
                    <div className="insight-card-author-avatar">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="insight-card-author-info">
                      <span className="insight-card-author-name">{post.author.name}</span>
                      <span className="insight-card-author-role">{post.author.role}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
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
