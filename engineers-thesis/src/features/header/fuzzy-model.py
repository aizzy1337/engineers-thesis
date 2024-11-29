import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

# Define fuzzy variables
insolation = ctrl.Antecedent(np.arange(0, 1500, 1), 'insolation')
shading = ctrl.Antecedent(np.arange(0, 100, 1), 'shading')
orientation = ctrl.Antecedent(np.arange(0, 360, 1), 'orientation')
potential = ctrl.Consequent(np.arange(0, 100, 1), 'potential')

# Define membership functions
insolation['very_low'] = fuzz.gaussmf(insolation.universe, 475, 100)
insolation['low'] = fuzz.gaussmf(insolation.universe, 985, 35)
insolation['medium'] = fuzz.gaussmf(insolation.universe, 1060, 40)
insolation['high'] = fuzz.gaussmf(insolation.universe, 1135, 35)
insolation['very_high'] = fuzz.gaussmf(insolation.universe, 1200, 50)

shading['no_shade'] = fuzz.trimf(shading.universe, [0, 0, 10])
shading['light_shade'] = fuzz.trimf(shading.universe, [10, 20, 30])
shading['medium_shade'] = fuzz.trimf(shading.universe, [30, 40, 50])
shading['significant_shade'] = fuzz.trimf(shading.universe, [50, 62.5, 75])
shading['full_shade'] = fuzz.trimf(shading.universe, [75, 87.5, 100])

orientation['S'] = fuzz.trapmf(orientation.universe, [150, 150, 180, 210])
orientation['SW'] = fuzz.trapmf(orientation.universe, [210, 210, 225, 240])
orientation['SE'] = fuzz.trapmf(orientation.universe, [120, 120, 135, 150])
orientation['E'] = fuzz.trapmf(orientation.universe, [60, 60, 75, 90])
orientation['W'] = fuzz.trapmf(orientation.universe, [270, 270, 285, 300])
orientation['N'] = fuzz.trapmf(orientation.universe, [300, 300, 330, 360])

potential['very_low'] = fuzz.gaussmf(potential.universe, 10, 10)
potential['low'] = fuzz.gaussmf(potential.universe, 30, 10)
potential['medium'] = fuzz.gaussmf(potential.universe, 50, 10)
potential['high'] = fuzz.gaussmf(potential.universe, 70, 10)
potential['very_high'] = fuzz.gaussmf(potential.universe, 90, 10)

# Define fuzzy rules
rule1 = ctrl.Rule(insolation['very_high'] & shading['no_shade'], potential['very_high'])
rule2 = ctrl.Rule(insolation['high'] & shading['light_shade'], potential['high'])
# Add more rules as needed

# Create control system
potential_ctrl = ctrl.ControlSystem([rule1, rule2])
potential_sim = ctrl.ControlSystemSimulation(potential_ctrl)

# Function to evaluate the model
def evaluate_fuzzy(insolation_value, shading_value, orientation_value):
    potential_sim.input['insolation'] = insolation_value
    potential_sim.input['shading'] = shading_value
    potential_sim.input['orientation'] = orientation_value
    potential_sim.compute()
    return potential_sim.output['potential']
