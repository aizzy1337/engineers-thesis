import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './background.css';

export const Background = () => {
    const particlesInit = useCallback(async (engine) => {      
        await loadFull(engine);
      }, []);
    
    const particlesLoaded = useCallback(async (container) => {
      await console.log(container);
    }, []);

    return (
        <div>
            <Particles
                init={particlesInit}
                id="tsparticles"
                loaded={particlesLoaded}
                options={{ "fullScreen": false, "particles":{ "number":{ "value":50, "density":{ "enable":true, "value_area":600 } }, "color":{ "value":["#49BFBF",
                    "#63BFAE", "#96D9B3"]  }, "shape": { "type": "circle", "stroke":{ "width":0, "color":"#000000" }, "polygon":{ "nb_sides":5 } }, "opacity":{ "value":0.25, "random":true, "anim":{ "enable":false, "speed":1, "opacity_min":0.1, "sync":false } }, "size":{ "value":5, "random":true, "anim":{ "enable":false, "speed":2, "size_min":0.1, "sync":false } }, "line_linked":{ "enable":false, "distance":300, "color":"#ffffff", "opacity":0, "width":0 }, "move":{ "enable":true, "speed":0.5, "direction":"top", "straight":true, "out_mode":"out", "bounce":false, "attract":{ "enable":false, "rotateX":600, "rotateY":1200 } } }, "interactivity":{ "detect_on":"canvas", "events":{ "onhover":{ "enable":false, "mode":"repulse" }, "onclick":{ "enable":false, "mode":"push" }, "resize":true }, "modes":{ "grab":{ "distance":800, "line_linked":{ "opacity":1 } }, "bubble":{ "distance":790, "size":50, "duration":2, "opacity":0.8, "speed":3 }, "repulse":{ "distance":400, "duration":0.4 }, "push":{ "particles_nb":4 }, "remove":{ "particles_nb":2 } } }, "retina_detect":true}}
          />
        </div>
    );
}

export default Background;