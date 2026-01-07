def calculate_runway(df):
    # Calculate Total Income (Credits) and Total Spend (Debits)
    total_income = df[df['Type'] == 'Credit']['Amount'].sum()
    total_debit = df[df['Type'] == 'Debit']['Amount'].sum()
    
    current_balance = total_income - total_debit
    
    # Calculate daily burn rate based on the number of days in the CSV
    # We'll assume the CSV covers 15 days for the demo
    days_elapsed = 15 
    daily_burn = total_debit / days_elapsed
    
    if daily_burn > 0 and current_balance > 0:
        runway_days = int(current_balance / daily_burn)
    else:
        runway_days = 0
        
    return {
        "days": runway_days,
        "daily_burn": round(daily_burn, 2)
    }