export const windFuzzyModel = `
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

windSpeed = ctrl.Antecedent(np.arange(0, 25.1, 0.1), 'WindSpeed')
roughness = ctrl.Antecedent(np.arange(0, 4.1, 0.1), 'Roughness')
potential = ctrl.Consequent(np.arange(0, 101, 1), 'Potential', defuzzify_method='mom')

windSpeed['Marginal'] = fuzz.sigmf(windSpeed.universe, 5, -3)
windSpeed['Sufficient'] = fuzz.gaussmf(windSpeed.universe, 5.25, 0.5)
windSpeed['Good'] = fuzz.gaussmf(windSpeed.universe, 6.25, 0.5)
windSpeed['Perfect'] = fuzz.sigmf(windSpeed.universe, 6.5, 3)

roughness['NoRoughness'] = fuzz.sigmf(roughness.universe, 1, -6)
roughness['LowRoughnes'] = fuzz.gaussmf(roughness.universe, 1.5, 0.5)
roughness['MediumRoughnes'] = fuzz.gaussmf(roughness.universe, 2.5, 0.5)
roughness['HighRoughnes'] = fuzz.sigmf(roughness.universe, 3, 6)

potential['NoPotential'] = fuzz.trimf(potential.universe, [-0.01, 0, 0.01])
potential['LowPotential'] = fuzz.trimf(potential.universe, [32.99, 33, 33.01])
potential['MediumPotential'] = fuzz.trimf(potential.universe, [65.99, 66, 66.01])
potential['HighPotential'] = fuzz.trimf(potential.universe, [99.9, 100, 100.01])

rule1 = ctrl.Rule(windSpeed['Marginal'], potential['NoPotential'])
rule2 = ctrl.Rule(roughness['HighRoughnes'], potential['NoPotential'])
rule3 = ctrl.Rule(windSpeed['Sufficient'] & roughness['NoRoughness'], potential['LowPotential'])
rule4 = ctrl.Rule(windSpeed['Sufficient'] & roughness['LowRoughnes'], potential['NoPotential'])
rule5 = ctrl.Rule(windSpeed['Sufficient'] & roughness['MediumRoughnes'], potential['NoPotential'])
rule6 = ctrl.Rule(windSpeed['Good'] & roughness['NoRoughness'], potential['MediumPotential'])
rule7 = ctrl.Rule(windSpeed['Good'] & roughness['LowRoughnes'], potential['LowPotential'])
rule8 = ctrl.Rule(windSpeed['Good'] & roughness['MediumRoughnes'], potential['NoPotential'])
rule9 = ctrl.Rule(windSpeed['Perfect'] & roughness['NoRoughness'], potential['HighPotential'])
rule10 = ctrl.Rule(windSpeed['Perfect'] & roughness['LowRoughnes'], potential['MediumPotential'])
rule11 = ctrl.Rule(windSpeed['Perfect'] & roughness['MediumRoughnes'], potential['LowPotential'])

wind_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10, rule11])
windSpeed_system = ctrl.ControlSystemSimulation(wind_ctrl)

def evaluate_fuzzy(windSpeed, roughness):
    windSpeed_system.input['WindSpeed'] = windSpeed
    windSpeed_system.input['Roughness'] = roughness
    windSpeed_system.compute()
    return windSpeed_system.output['Potential']
`;