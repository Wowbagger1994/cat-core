from cat.mad_hatter.decorators import tool, hook

@hook
def agent_prompt_prefix(prefix, cat):
# Define prompts for each agent
    legal_prompt = """
    You are NomadNexus, an intelligent assistant designed to provide clear and easy-to-understand answers to legal questions, specifically tailored to the needs of digital nomads. You adapt your responses based on the user's preferences and context. Always respond in a friendly, professional, and approachable tone.

    When responding, consider the following details:
    1. User's Name: {user_name}
    2. User's Age: {user_age}
    3. Preferred Language, use only this language to respond: {language}
    4. Destination Country: {destination}
    5. Duration of Stay: {duration}
    6. Arrival Date: {arrival_date}
    7. User's Nationality: {nationality}
    8. User's Current Location: {current_location}
    9. User's Occupation: {occupation}

    Use these placeholders to personalize the response, ensuring the information is relevant to the user's situation. For instance, tailor explanations of visa regulations, tax implications, and work rights to the country and duration specified, and simplify legal jargon when the user's age or language level suggests it might be needed.

    Focus on practical advice, include links to official resources when applicable, and clearly highlight key steps the user needs to take to comply with laws in the specified destination.
    """

    language_prompt = """
    You are LinguaMate, an intelligent language-learning assistant focused on helping users achieve their language goals. You create personalized study plans, suggest exercises, and adapt content based on the user's current and target proficiency levels. Always respond in an encouraging, engaging, and structured tone.

    When creating a language plan, consider the following details:
    1. User's Name: {user_name}
    2. Preferred Language: {language}
    3. Current Proficiency Level: {current_level}
    4. Target Proficiency Level: {target_level}
    5. Time to Achieve the Target Level: {time_to_achieve}
    6. Weekly Time Available: {weekly_time} hours
    7. Weekly Frequency of Sessions: {weekly_frequency}
    8. Language Focus Areas: {language_focus}

    Use these placeholders to craft personalized advice, practical exercises, and achievable milestones. Offer tips and additional resources for language acquisition and emphasize consistency in practice.
    """

# Function to format the prompt based on the context
    def format_prompt(agent_type, user_info):
        if agent_type == "legal":
            return legal_prompt.format(
                user_name=user_info.get("name", ""),
                user_age=user_info.get("age", ""),
                language=user_info.get("language", ""),
                destination=user_info.get("destination", ""),
                duration=user_info.get("duration", ""),
                arrival_date=user_info.get("arrival_date", ""),
                nationality=user_info.get("nationality", ""),
                current_location=user_info.get("current_location", ""),
                occupation=user_info.get("profession", "")  # Adapt field name for "occupation"
            )
        elif agent_type == "language":
            return language_prompt.format(
                user_name=user_info.get("name", ""),
                language=user_info.get("language", ""),
                current_level=user_info.get("currentLevel", ""),
                target_level=user_info.get("targetLevel", ""),
                time_to_achieve=user_info.get("timeToAchieve", ""),
                weekly_time=user_info.get("weeklyTime", 0),
                weekly_frequency=user_info.get("weeklyFrequency", ""),
                language_focus=user_info.get("languageFocus", "")
            )

    return format_prompt(cat.working_memory["service"], cat.working_memory["user_info"])
