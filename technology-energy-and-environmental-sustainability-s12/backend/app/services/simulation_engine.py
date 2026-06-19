class SimulationEngine:
    COEFFICIENTS = {
        'Solar': {'pollution': 5, 'co2': 5, 'sustainability': 95, 'cost': 60},
        'Wind': {'pollution': 8, 'co2': 5, 'sustainability': 90, 'cost': 55},
        'Hydro': {'pollution': 20, 'co2': 15, 'sustainability': 80, 'cost': 50},
        'Coal': {'pollution': 95, 'co2': 100, 'sustainability': 25, 'cost': 30},
        'Petroleum': {'pollution': 85, 'co2': 90, 'sustainability': 20, 'cost': 35}
    }

    @staticmethod
    def calculate_scores(solar_pct, wind_pct, hydro_pct, coal_pct, petroleum_pct):
        split = {
            'Solar': solar_pct,
            'Wind': wind_pct,
            'Hydro': hydro_pct,
            'Coal': coal_pct,
            'Petroleum': petroleum_pct
        }
        
        pollution_score = sum(split[source] * SimulationEngine.COEFFICIENTS[source]['pollution'] 
                             for source in split) / 100
        co2_score = sum(split[source] * SimulationEngine.COEFFICIENTS[source]['co2'] 
                       for source in split) / 100
        sustainability_score = sum(split[source] * SimulationEngine.COEFFICIENTS[source]['sustainability'] 
                                  for source in split) / 100
        cost_score = sum(split[source] * SimulationEngine.COEFFICIENTS[source]['cost'] 
                        for source in split) / 100
        
        return {
            'pollution_score': round(pollution_score, 2),
            'co2_score': round(co2_score, 2),
            'sustainability_score': round(sustainability_score, 2),
            'cost_score': round(cost_score, 2)
        }
