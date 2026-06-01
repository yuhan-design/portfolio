# Inject portfolio redesign assets into all HTML files
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$skip = @("theme-preview.html")

$fontBlockRoot = @"
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="css/themes/theme-apex.css" id="pf-theme-css">
	<link rel="stylesheet" href="css/portfolio-redesign.css">
"@

$fontBlockDetail = $fontBlockRoot -replace 'href="css/', 'href="../css/'

$themeScriptRoot = "	<script src=`"js/theme.js`"></script>`n"
$themeScriptDetail = "	<script src=`"../js/theme.js`"></script>`n"

Get-ChildItem -Path $root -Filter "*.html" -Recurse | ForEach-Object {
    $file = $_.FullName
    $name = $_.Name
    if ($skip -contains $name) { return }

    $content = Get-Content -Path $file -Raw -Encoding UTF8
    if ($content -match "portfolio-redesign\.css") {
        Write-Host "Skip (already injected): $name"
        return
    }

    $isDetail = $file -match [regex]::Escape([IO.Path]::Combine("detailpages"))
    $fontBlock = if ($isDetail) { $fontBlockDetail } else { $fontBlockRoot }
    $themeScript = if ($isDetail) { $themeScriptDetail } else { $themeScriptRoot }

    # Inject CSS after style.css
    if ($content -match '(<link rel="stylesheet" href="(\.\./)?css/style\.css">)') {
        $content = $content -replace '(<link rel="stylesheet" href="(\.\./)?css/style\.css">)', "`$1`n$fontBlock"
    }

    # Body class + background
    if ($content -notmatch 'class="pf-body"') {
        $content = $content -replace '<body>', '<body class="pf-body">'
        $content = $content -replace '<body class="pf-body">', "<body class=`"pf-body`">`n`t<div class=`"pf-site-bg`" aria-hidden=`"true`"></div>`n"
    }

    # Theme script before main.js
    if ($content -match '<script src="(\.\./)?js/main\.js"></script>' -and $content -notmatch 'theme\.js') {
        $content = $content -replace '(<script src="(\.\./)?js/main\.js"></script>)', "$themeScript`$1"
    }

    [IO.File]::WriteAllText($file, $content, [Text.UTF8Encoding]::new($false))
    Write-Host "Updated: $name"
}

Write-Host "Done."
