from cat.mad_hatter.decorators import tool, hook

@hook
def before_cat_reads_message(msg, cat):
    if "user_info" in msg:
        cat.working_memory["user_info"] = msg["user_info"]
