import './header.css'
import { loadPyodide } from "pyodide";
import { useState } from 'react';

export default function Header() {
  const [potential, setPotential] = useState(null);
  
  const handleEvaluate = async () => {
    const pyodide = await loadPyodide(
      {indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.3/full/"}
    );
    await pyodide.loadPackage('numpy');
    await pyodide.loadPackage('scipy');
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install('scikit-fuzzy');
    await micropip.install('networkx');

    pyodide.runPythonAsync(
      `
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# Define fuzzy variables
solar_insolation = ctrl.Antecedent(np.arange(0, 1500, 1), 'solar_insolation')
shade_level = ctrl.Antecedent(np.arange(0, 100, 1), 'shade_level')
panel_orientation = ctrl.Antecedent(np.arange(0, 360, 1), 'panel_orientation')
energy_potential = ctrl.Consequent(np.arange(0, 100, 1), 'energy_potential')

# Define membership functions
solar_insolation['very_low'] = fuzz.gaussmf(solar_insolation.universe, 475, 100)
solar_insolation['low'] = fuzz.gaussmf(solar_insolation.universe, 985, 35)
solar_insolation['medium'] = fuzz.gaussmf(solar_insolation.universe, 1060, 40)
solar_insolation['high'] = fuzz.gaussmf(solar_insolation.universe, 1135, 35)
solar_insolation['very_high'] = fuzz.gaussmf(solar_insolation.universe, 1200, 50)

shade_level['no_shade'] = fuzz.trimf(shade_level.universe, [0, 0, 10])
shade_level['light_shade'] = fuzz.trimf(shade_level.universe, [10, 20, 30])
shade_level['medium_shade'] = fuzz.trimf(shade_level.universe, [30, 40, 50])
shade_level['significant_shade'] = fuzz.trimf(shade_level.universe, [50, 62.5, 75])
shade_level['full_shade'] = fuzz.trimf(shade_level.universe, [75, 87.5, 100])

panel_orientation['S'] = fuzz.trapmf(panel_orientation.universe, [150, 150, 180, 210])
panel_orientation['SW'] = fuzz.trapmf(panel_orientation.universe, [210, 210, 225, 240])
panel_orientation['SE'] = fuzz.trapmf(panel_orientation.universe, [120, 120, 135, 150])
panel_orientation['E'] = fuzz.trapmf(panel_orientation.universe, [60, 60, 75, 90])
panel_orientation['W'] = fuzz.trapmf(panel_orientation.universe, [270, 270, 285, 300])
panel_orientation['N'] = fuzz.trapmf(panel_orientation.universe, [300, 300, 330, 360])

energy_potential['very_low'] = fuzz.gaussmf(energy_potential.universe, 10, 10)
energy_potential['low'] = fuzz.gaussmf(energy_potential.universe, 30, 10)
energy_potential['medium'] = fuzz.gaussmf(energy_potential.universe, 50, 10)
energy_potential['high'] = fuzz.gaussmf(energy_potential.universe, 70, 10)
energy_potential['very_high'] = fuzz.gaussmf(energy_potential.universe, 90, 10)

# Define fuzzy rules
rule1 = ctrl.Rule(solar_insolation['very_high'] & shade_level['no_shade'] & panel_orientation['S'], energy_potential['very_high'])
rule2 = ctrl.Rule(solar_insolation['high'] & shade_level['light_shade'] & panel_orientation['SW'], energy_potential['high'])
rule3 = ctrl.Rule(solar_insolation['medium'] & shade_level['medium_shade'] & panel_orientation['SE'], energy_potential['medium'])
rule4 = ctrl.Rule(solar_insolation['low'] & shade_level['significant_shade'] & panel_orientation['E'], energy_potential['low'])
rule5 = ctrl.Rule(solar_insolation['very_low'] & shade_level['full_shade'] & panel_orientation['N'], energy_potential['very_low'])
rule5 = ctrl.Rule(solar_insolation['medium'] & shade_level['light_shade'] & panel_orientation['S'], energy_potential['very_high'])
# Add more rules as needed

# Create control system
energy_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5])
energy_sim = ctrl.ControlSystemSimulation(energy_ctrl)

# Function to evaluate the model
def evaluate_fuzzy(solar_insolation_value, shade_level_value, panel_orientation_value):
    energy_sim.input['solar_insolation'] = solar_insolation_value
    energy_sim.input['shade_level'] = shade_level_value
    energy_sim.input['panel_orientation'] = panel_orientation_value
    energy_sim.compute()
    return energy_sim.output['energy_potential']

`
    );
    
    const evaluateFuzzy = pyodide.globals.get('evaluate_fuzzy');
    const result = evaluateFuzzy(1050, 20, 180);
    setPotential(result);
  };

    return(
    <header>
        <div className='header-grid'>
          <div className='header-card'>
            <img src='../icon.png' alt='icon'/>
          </div>
          <div className='header-card'>
            <button onClick={handleEvaluate}>Evaluate</button>
            <h1 className='title'>RES POTENTIAL {potential}</h1>
          </div>
        </div>
        <h3 className='subtitle'>Leveraging edge computing in an application to explore the potential for building domestic RES installations</h3>
    </header>
    );
}