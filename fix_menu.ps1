$files = Get-ChildItem -Path . -Include *.html,*.js -Recurse | Where-Object { $_.FullName -notmatch 'node_modules' }

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)

    # Case-sensitive replace: force all variants to "Shanilink"
    $content = [regex]::Replace($content, 'SHANILINK', 'Shanilink')
    $content = [regex]::Replace($content, 'shanilink', 'Shanilink')

    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Processed: $($file.Name)"
}
