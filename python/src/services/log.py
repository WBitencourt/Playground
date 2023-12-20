import datetime


def log_entry(message: str, type_log: str = "INFO"):
    # Get the current formatted date
    formatted_date = datetime.datetime.now().strftime("[%d/%b/%Y %H:%M:%S]")

    # Build the complete message
    separator_message = f"{'-' * 50}\n"
    formatted_message = ' '.join([
        f"{formatted_date}: {type_log}",
        f"\n{message}\n",
        f"\n{separator_message}\n"
    ])

    # Open the file in read mode to read existing content
    with open("log.txt", "r") as log_file:
        # Read existing content
        existing_content = log_file.read()

    # Open the file in write mode to update the content
    with open("log.txt", "w") as log_file:
        # Prepend the new message and then append the existing content
        log_file.write(formatted_message + existing_content)

    print(formatted_message)
