import bzpLogo from '../../assets/images/bzp.png'
import korteLogo from '../../assets/images/korte.png'
import planoutLogo from '../../assets/images/planout.png'
import tripketLogo from '../../assets/images/Tripketph.png'
import { partners } from '../../content/partners'
import './Partners.css'

const LOGO_MAP = {
  bzp: bzpLogo,
  planout: planoutLogo,
  korte: korteLogo,
  tripket: tripketLogo,
}

export default function Partners() {
  return (
    <div className="partners-section" aria-label="Trusted partners">
      <p className="partners-label">TRUSTED BY FOUNDERS, LEADERS, AND TEAMS AT:</p>
      <div className="partners-row" role="list">
        {partners.map((brand, i) => (
          <>
            {i > 0 && <span key={`div-${brand.id}`} className="partners-divider" aria-hidden="true" />}
            <div key={brand.id} className="partners-item" role="listitem">
              <img
                src={LOGO_MAP[brand.id]}
                alt={brand.name}
                className="partners-logo"
                draggable="false"
              />
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
