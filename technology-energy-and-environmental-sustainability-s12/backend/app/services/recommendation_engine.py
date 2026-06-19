class RecommendationEngine:
    @staticmethod
    def evaluate_mix(pollution_score, co2_score, sustainability_score, 
                    solar_pct, wind_pct, coal_pct, petroleum_pct):
        recommendations = []
        tips = []
        
        if pollution_score > 70:
            recommendations.append("Environmental Risk")
        
        if coal_pct > 50:
            recommendations.append("High Pollution Alert")
        
        if petroleum_pct > 40:
            recommendations.append("High Carbon Emissions")
        
        if solar_pct + wind_pct > 60:
            recommendations.append("Sustainable Mix")
            tips.append("Your renewable energy mix is excellent. Consider increasing solar and wind further.")
        
        if sustainability_score > 80:
            tips.append("Excellent Energy Plan")
            tips.append("Your energy mix demonstrates strong sustainability commitment.")
            tips.append("Consider investing in battery storage to maximize renewable efficiency.")
        else:
            if coal_pct > 30 or petroleum_pct > 25:
                tips.append("Reduce fossil fuel dependency for better sustainability scores.")
            if solar_pct < 20:
                tips.append("Increase solar energy allocation to improve sustainability.")
        
        if not recommendations:
            recommendations.append("Balanced Energy Mix")
            tips.append("Your current energy mix is well-balanced.")
        
        recommendation_text = " | ".join(recommendations)
        
        return {
            "recommendation": recommendation_text,
            "tips": tips
        }
