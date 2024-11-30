import './header.css'

export default function Header() {
    return(
    <header>
        <div className='header-grid'>
          <div className='header-card'>
            <img src='../icon.png' alt='icon'/>
          </div>
          <div className='header-card'>
            <h1 className='title'>RES POTENTIAL</h1>
          </div>
        </div>
        <h3 className='subtitle'>Leveraging edge computing in an application to explore the potential for building domestic RES installations</h3>
    </header>
    );
}