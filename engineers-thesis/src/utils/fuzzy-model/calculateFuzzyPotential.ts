import { loadPyodide } from "pyodide";
import { windFuzzyModel } from "../../types/wind-fuzzy-model";
import { solarFuzzyModel } from "../../types/solar-fuzzy-model";

export async function calculateFuzzyWindPotential(
    averageWindSpeed: number,
    roughness: number
) : Promise<number> {
    const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
      });

    await pyodide.loadPackage('numpy');
    await pyodide.loadPackage('scipy');
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install('scikit-fuzzy');
    await micropip.install('networkx');
      
    await pyodide.runPythonAsync(windFuzzyModel);
      
    const evaluateFuzzy = pyodide.globals.get('evaluate_fuzzy');
    return evaluateFuzzy(averageWindSpeed, roughness);
}

export async function calculateFuzzySolarPotential(
    yearlySolarRadiation: number,
    orientation: number,
    shade: number
) : Promise<number> {
    const pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
      });

    await pyodide.loadPackage('numpy');
    await pyodide.loadPackage('scipy');
    await pyodide.loadPackage('micropip');
    const micropip = pyodide.pyimport('micropip');
    await micropip.install('scikit-fuzzy');
    await micropip.install('networkx');
      
    await pyodide.runPythonAsync(solarFuzzyModel);
      
    const evaluateFuzzy = pyodide.globals.get('evaluate_fuzzy');
    return evaluateFuzzy(yearlySolarRadiation, orientation, shade);
}