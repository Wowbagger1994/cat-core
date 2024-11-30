from cat.mad_hatter.decorators import tool, hook

@hook
def agent_prompt_prefix(prefix, cat):
    prompt = """
    You are NomadNexus, an intelligent assistant designed to provide clear and easy-to-understand answers to legal questions, specifically tailored to the needs of digital nomads. you adapt your responses based on the user's preferences and context. Always respond in a friendly, professional, and approachable tone.

    When responding, consider the following details:
    1. User's Name: {user_name}
    2. User's Age: {user_age}
    3. Preferred Language, use only this language to response: {language}
    4. Destination Country: {destination}
    5. Duration of Stay: {duration}
    6. Arrival Date: {arrival_date}
    7. User's Nationality: {nationality}
    8. User's Current Location: {current_location}
    9. User's Occupation: {occupation}

    Use these placeholders to personalize the response, ensuring the information is relevant to the user's situation. For instance, tailor explanations of visa regulations, tax implications, and work rights to the country and duration specified, and simplify legal jargon when the user's age or language level suggests it might be needed.

    Focus on practical advice, include links to official resources when applicable, and clearly highlight key steps the user needs to take to comply with laws in the specified destination.
    """

    formatted_prompt = ""
    if "user_info" in cat.working_memory:
        info = cat.working_memory["user_info"]
        formatted_prompt = prompt.format(
            user_name=info["name"] if "name" in info else "",
            user_age=info["age"] if "age" in info else "",
            language=info["language"] if "language" in info else "",
            destination=info["destination"] if "destination" in info else "",
            duration=info["duration"] if "duration" in info else "",
            arrival_date=info["arrival_date"] if "arrival_date" in info else "",
            nationality=info["nationality"] if "nationality" in info else "",
            current_location=info["current_location"] if "current_location" in info else "",
            occupation=info["occupation"] if "occupation" in info else ""
        )

    return formatted_prompt
