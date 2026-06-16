$headers = @{
  "Accept" = "application/vnd.github+json"
  "Authorization" = "Bearer `$env:GITHUB_TOKEN"
  "X-GitHub-Api-Version" = "2022-11-28"
}
$body = @{
  tag_name = "v2.0.2"
  name = "Edge Terminal v2.0.2"
  body = "Bento Grid Dashboard Redesign (True Pro Max Data Dense Layout)"
  draft = $false
  prerelease = $false
  generate_release_notes = $false
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "https://api.github.com/repos/U38572331/edge-terminal/releases" -Method Post -Headers $headers -Body $body -ContentType "application/json"

$uploadUrl = $response.upload_url -replace '\{\?name,label\}', '?name=Edge-Terminal-Setup-2.0.2.exe'
Write-Host "Upload URL: $uploadUrl"

$filePath = ".\release\Edge Terminal Setup 2.0.2.exe"

$uploadHeaders = @{
  "Accept" = "application/vnd.github+json"
  "Authorization" = "Bearer `$env:GITHUB_TOKEN"
  "X-GitHub-Api-Version" = "2022-11-28"
  "Content-Type" = "application/octet-stream"
}

Invoke-RestMethod -Uri $uploadUrl -Method Post -Headers $uploadHeaders -InFile $filePath

Write-Host "Done."
