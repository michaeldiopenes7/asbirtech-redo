import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuArrowUpRight } from 'react-icons/lu'

export default function ShowcaseCard({ client, title, index, id, image, imagePosition }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <Link to={`/projects/${id}`} className="sc-card" aria-label={`View ${client} case study`}>
      <div className="sc-stage">
        <div className="sc-stage-top">
          <span className="sc-index">{String(index).padStart(2, '0')}</span>
        </div>

        <div className="sc-frame" aria-hidden="true">
          {image ? (
            <>
              {!imgLoaded && <div className="sc-frame-skel skel" aria-hidden="true" />}
              <img
                src={image}
                alt=""
                className={`sc-frame-img${imgLoaded ? ' is-loaded' : ''}`}
                style={imagePosition ? { objectPosition: imagePosition } : undefined}
                loading="lazy"
                decoding="async"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
              />
            </>
          ) : (
            <div className="sc-frame-placeholder" />
          )}
        </div>
      </div>

      <div className="sc-footer">
        <div className="sc-footer-text">
          <h3 className="sc-title">{title}</h3>
        </div>
        <span className="sc-cta">
          <span className="sc-arrow"><LuArrowUpRight /></span>
        </span>
      </div>
    </Link>
  )
}
