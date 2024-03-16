Set-ExecutionPolicy Unrestricted

if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Please run this script as an administrator."
    Exit
}

if (-not (Get-PackageProvider -Name NuGet -ErrorAction SilentlyContinue)) {
    Install-PackageProvider -Name NuGet -Force -Confirm:$False
}

if (-not (Get-Module -Name PSWindowsUpdate -ListAvailable -ErrorAction SilentlyContinue)) {
    Install-Module -Name PSWindowsUpdate -Force
}

Install-WindowsUpdate -MicrosoftUpdate -AcceptAll

# winget.json saved in filebrower
# winget export -o winget.json
# winget import -i winget.json
# winget upgrade --all --pinned --accept-package-agreements --accept-source-agreements --interactive

# winget install --id=7zip.7zip -e -i ;
# winget install --id=Adobe.Acrobat.Reader.64-bit -e -i ;
# winget install --id=AgileBits.1Password -e -i ;
# winget install --id=Canonical.Ubuntu.2204 -e -i ;
# winget install --id=Cisco.WebexTeams -e -i ;
# winget install --id=Docker.DockerDesktop -e -i ;
# winget install --id=Fortinet.FortiClientVPN -e -i ;
# winget install --id=GitHub.GitHubDesktop -e -i ;
# winget install --id=Google.Chrome -e -i ;
# winget install --id=jqlang.jq -e -i ;
# winget install --id=Microsoft.AppInstaller -e -i ;
# winget install --id=Microsoft.Git -e -i ;
# winget install --id=Microsoft.LAPS -e -i ;
# winget install --id=Microsoft.Office -e -i ;
# winget install --id=Microsoft.OneDrive -e -i ;
# winget install --id=Microsoft.PowerBI -e -i ;
# winget install --id=Microsoft.PowerShell -e -i ;
# winget install --id=Microsoft.SQLServer.2012.NativeClient -e -i ; # CHECK VERSION
# winget install --id=Microsoft.SQLServerManagementStudio -e -i ;
# winget install --id=Microsoft.Teams -e -i ;
# winget install --id=Microsoft.VisualStudioCode -e -i ;
# winget install --id=Microsoft.WindowsTerminal -e -i ;
# winget install --id=Mozilla.Firefox -e -i ;
# winget install --id=PDFsam.PDFsam -e -i ;
