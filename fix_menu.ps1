$files = @('index.html','doctors.html','about.html','services.html','pharmacy.html','appointments.html','contact.html')
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText((Resolve-Path $file).Path, [System.Text.Encoding]::UTF8)

    # Change Book Appointment button from solid red back to outlined, red only on hover
    $content = $content -replace 'block w-full py-4 bg-\[#990000\] text-white rounded-xl font-bold text-lg text-center hover:opacity-90 transition-all', 'block w-full py-4 border-2 border-[#990000] text-[#990000] rounded-xl font-bold text-lg text-center hover:bg-[#990000] hover:text-white transition-all'

    [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $file"
}
