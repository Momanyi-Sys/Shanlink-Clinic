$files = @('index.html','doctors.html','about.html','services.html','pharmacy.html','appointments.html','contact.html')
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText((Resolve-Path $file).Path, [System.Text.Encoding]::UTF8)

    # Change mobile-menu from full-screen overlay to right-side panel
    $content = $content -replace 'fixed inset-0 z-\[70\] hidden flex-col bg-white/95 backdrop-blur-xl', 'fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[70] hidden flex-col bg-white shadow-2xl border-l border-slate-100'

    # Change Book Appointment button from yellow to red
    $content = $content -replace 'block w-full py-4 bg-\[#facc15\] text-black rounded-xl font-bold text-lg text-center hover:bg-\[#990000\] hover:text-white transition-all', 'block w-full py-4 bg-[#990000] text-white rounded-xl font-bold text-lg text-center hover:opacity-90 transition-all'

    [System.IO.File]::WriteAllText((Resolve-Path $file).Path, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Updated: $file"
}
