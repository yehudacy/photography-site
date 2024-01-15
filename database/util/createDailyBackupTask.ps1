# Specify the task name and action
$TaskName = "DailyBackupTask"
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "node --env-file=C:\Users\yehuda aryeh cywiak\photography-site\server\.env 
C:\Users\yehuda aryeh cywiak\photography-site\database\util\createDataBaseDump.js"


# Specify the trigger for daily execution
$Trigger = New-ScheduledTaskTrigger -Daily -At "3:00 AM"


# Create the task
$Task = New-ScheduledTask -Action $Action -Trigger $Trigger -Settings (New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries)


# Register the task
Register-ScheduledTask -TaskName $TaskName -InputObject $Task