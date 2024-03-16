Echo "Keep alive wih scroll lock..."

$WShell = New-Object -com "Wscript.Shell"

while ($true)
{
Echo "Toggled at $(Get-Date)"
$WShell.sendkeys("{SCROLLLOCK}")
Start-Sleep -Milliseconds 60
$WShell.sendkeys("{SCROLLLOCK}")
Start-Sleep -Seconds 15
}
