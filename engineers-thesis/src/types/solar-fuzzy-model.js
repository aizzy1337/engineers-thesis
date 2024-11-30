export const solarFuzzyModel = `
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

insolation = ctrl.Antecedent(np.arange(0, 2001, 1), 'Insolation')
shade = ctrl.Antecedent(np.arange(0, 101, 1), 'Shade')
orientation = ctrl.Antecedent(np.arange(0, 361, 1), 'Orientation')

potential = ctrl.Consequent(np.arange(0, 101, 1), 'Potential', defuzzify_method='mom')

insolation['VeryLow'] = fuzz.sigmf(insolation.universe, 950, -0.1)
insolation['Low'] = fuzz.gaussmf(insolation.universe, 985, 25)
insolation['Medium'] = fuzz.gaussmf(insolation.universe, 1060, 30)
insolation['High'] = fuzz.gaussmf(insolation.universe, 1135, 25)
insolation['VeryHigh'] = fuzz.sigmf(insolation.universe, 1170, 0.1)

shade['NoShadow'] = fuzz.sigmf(shade.universe, 10, -1)
shade['LightShadow'] = fuzz.gaussmf(shade.universe, 30, 10)
shade['MediumShadow'] = fuzz.gaussmf(shade.universe, 50, 10)
shade['HeavyShadow'] = fuzz.sigmf(shade.universe, 70, 1)

orientation['FarFromSouth1'] = fuzz.gaussmf(orientation.universe, 0, 90)
orientation['CloseToSouth'] = fuzz.gaussmf(orientation.universe, 180, 40)
orientation['FarFromSouth2'] = fuzz.gaussmf(orientation.universe, 360, 90)

potential['NoPotential'] = fuzz.trimf(shade.universe, [-0.01, 0, 0.01])
potential['LowPotential'] = fuzz.trimf(shade.universe, [32.99, 33, 33.01])
potential['MediumPotential'] = fuzz.trimf(shade.universe, [65.99, 66, 66.01])
potential['HighPotential'] = fuzz.trimf(shade.universe, [99.9, 100, 100.01])

rule1 = ctrl.Rule(insolation['VeryLow'], potential['NoPotential'])
rule2 = ctrl.Rule(shade['HeavyShadow'], potential['NoPotential'])
rule3 = ctrl.Rule(insolation['Low'] & shade['NoShadow'] & orientation['CloseToSouth'], potential['LowPotential'])
rule4 = ctrl.Rule(insolation['Low'] & shade['LightShadow'], potential['NoPotential'])
rule5 = ctrl.Rule(insolation['Low'] & shade['MediumShadow'], potential['NoPotential'])
rule6 = ctrl.Rule(insolation['Medium'] & shade['NoShadow'] & orientation['CloseToSouth'], potential['MediumPotential'])
rule7 = ctrl.Rule(insolation['Medium'] & shade['NoShadow'] & orientation['FarFromSouth1'], potential['LowPotential'])
rule8 = ctrl.Rule(insolation['Medium'] & shade['NoShadow'] & orientation['FarFromSouth2'], potential['LowPotential'])
rule9 = ctrl.Rule(insolation['Medium'] & shade['LightShadow'] & orientation['CloseToSouth'], potential['LowPotential'])
rule10 = ctrl.Rule(insolation['Medium'] & shade['LightShadow'] & orientation['FarFromSouth1'], potential['NoPotential'])
rule11 = ctrl.Rule(insolation['Medium'] & shade['LightShadow'] & orientation['FarFromSouth2'], potential['NoPotential'])
rule12 = ctrl.Rule(insolation['Medium'] & shade['MediumShadow'], potential['NoPotential'])
rule13 = ctrl.Rule(insolation['High'] & shade['NoShadow'] & orientation['CloseToSouth'], potential['HighPotential'])
rule14 = ctrl.Rule(insolation['High'] & shade['NoShadow'] & orientation['FarFromSouth1'], potential['MediumPotential'])
rule15 = ctrl.Rule(insolation['High'] & shade['NoShadow'] & orientation['FarFromSouth2'], potential['MediumPotential'])
rule16 = ctrl.Rule(insolation['High'] & shade['LightShadow'] & orientation['CloseToSouth'], potential['MediumPotential'])
rule17 = ctrl.Rule(insolation['High'] & shade['LightShadow'] & orientation['FarFromSouth1'], potential['LowPotential'])
rule18 = ctrl.Rule(insolation['High'] & shade['LightShadow'] & orientation['FarFromSouth2'], potential['LowPotential'])
rule19 = ctrl.Rule(insolation['High'] & shade['MediumShadow']& orientation['CloseToSouth'], potential['LowPotential'])
rule20 = ctrl.Rule(insolation['High'] & shade['MediumShadow']& orientation['FarFromSouth1'], potential['NoPotential'])
rule21 = ctrl.Rule(insolation['High'] & shade['MediumShadow']& orientation['FarFromSouth2'], potential['NoPotential'])
rule22 = ctrl.Rule(insolation['VeryHigh'] & shade['NoShadow'] & orientation['CloseToSouth'], potential['HighPotential'])
rule23 = ctrl.Rule(insolation['VeryHigh'] & shade['NoShadow'] & orientation['FarFromSouth1'], potential['MediumPotential'])
rule24 = ctrl.Rule(insolation['VeryHigh'] & shade['NoShadow'] & orientation['FarFromSouth2'], potential['MediumPotential'])
rule25 = ctrl.Rule(insolation['VeryHigh'] & shade['LightShadow'] & orientation['CloseToSouth'], potential['MediumPotential'])
rule26 = ctrl.Rule(insolation['VeryHigh'] & shade['LightShadow'] & orientation['FarFromSouth1'], potential['LowPotential'])
rule27 = ctrl.Rule(insolation['VeryHigh'] & shade['LightShadow'] & orientation['FarFromSouth2'], potential['LowPotential'])
rule28 = ctrl.Rule(insolation['VeryHigh'] & shade['MediumShadow'] & orientation['CloseToSouth'], potential['LowPotential'])
rule29 = ctrl.Rule(insolation['VeryHigh'] & shade['MediumShadow'] & orientation['FarFromSouth1'], potential['NoPotential'])
rule30 = ctrl.Rule(insolation['VeryHigh'] & shade['MediumShadow'] & orientation['FarFromSouth2'], potential['NoPotential'])

solar_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9, rule10, rule11, rule12, rule13, rule14, rule15, rule16, rule17, rule18, rule19, rule20, rule21, rule22, rule23, rule24, rule25, rule26, rule27, rule28, rule29, rule30])
solar_system = ctrl.ControlSystemSimulation(solar_ctrl)

def evaluate_fuzzy(insolation, orientation, shade):
    solar_system.input['Insolation'] = insolation
    solar_system.input['Shade'] = shade
    solar_system.input['Orientation'] = orientation
    solar_system.compute()
    return solar_system.output['Potential']
`;