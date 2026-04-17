import bzpLogo from '../assets/images/bzp.png'
import korteLogo from '../assets/images/korte.png'
import planoutLogo from '../assets/images/planout.png'
import tripketLogo from '../assets/images/Tripketph.png'
import './Partners.css'

const brands = [
  { id: 1, name: 'BZP', logo: bzpLogo },
  { id: 2, name: 'Planout', logo: planoutLogo },
  { id: 3, name: 'Korte', logo: korteLogo },
  { id: 4, name: 'Tripket PH', logo: tripketLogo },
]

export default function Partners() {
  return (
    <div className="partners-section">
      <p className="partners-label">TRUSTED BY FOUNDERS, LEADERS, AND TEAMS AT:</p>
      <div className="partners-row">
        {brands.map((brand, i) => (
          <>
            {i > 0 && <span key={`div-${brand.id}`} className="partners-divider" />}
            <div key={brand.id} className="partners-item">
              <img src={brand.logo} alt={brand.name} className="partners-logo" draggable="false" />
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
