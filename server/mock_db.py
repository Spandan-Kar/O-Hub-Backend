SCHOLARSHIPS = [
    {"name": "Prerana Scholarship", "criteria": "SC/ST/OBC/SEBC Students", "amount": "₹5,000 - ₹12,000"},
    {"name": "Kalia Scholarship", "criteria": "Children of Farmers", "amount": "Variable"},
    {"name": "Gopabandhu Sikhya Sahayata", "criteria": "Graduate/Post-Graduate", "amount": "₹20,000"}
]

def get_dbt_readiness(user_profile):
    # Logic for SIH25059
    eligible = [s for s in SCHOLARSHIPS if user_profile['category'] in s['criteria']]
    return {
        "eligible_schemes": eligible,
        "action_required": "Aadhaar Seeding with Bank Account"
    }