# By following these steps, you can create a "keep alive" command that runs every 15 minutes and prevents your GitHub Codespace from going to sleep.

You can use a combination of a shell script and a cron job. The shell script will execute a command that does nothing (e.g., echo "keep alive"), and the cron job will schedule this script to run every 15 minutes.

> Pending task: Find out the right nothingness command to keep the terminal session active

# Step-by-Step Plan

- Create a Shell Script: Create a shell script that executes a command to keep the Codespace alive.
- Set Up a Cron Job: Set up a cron job to run the shell script every 15 minutes.

## Step 1: Create a shell script named keep_alive.sh in your GitHub Codespace.

`keep_alive.sh`

Make the script executable:

`chmod +x keep_alive.sh`

## Step 2: Set up a cron job to run the keep_alive.sh script every 15 minutes.

1. Open the Crontab Editor: Open the crontab editor by running the following command:
2. Add the Cron Job: Add the following line to the crontab file to schedule the keep_alive.sh script to run every 15 minutes. Replace /path/to/keep_alive.sh with the actual path to your script.
3. Save and exit the crontab editor.

> Explanation: Shell Script: The keep*alive.sh script contains a simple command (echo "keep alive") that does nothing but keeps the terminal session active. Cron Job: The cron job is set to run the keep_alive.sh script every 15 minutes (*/15 \_ \* \* \*).

> Example: If your keep_alive.sh script is located in the /home/codespace directory, the cron job entry would look like this:
