# Finalize portfolio site — Apex theme, normalized HTML
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

Get-ChildItem -Path $root -Filter "*.html" -Recurse | ForEach-Object {
    $file = $_.FullName
    $name = $_.Name
    if ($skip -contains $name) { return }

    $isDetail = $file -match [regex]::Escape([IO.Path]::Combine("detailpages"))
    $fontBlock = if ($isDetail) { $fontBlockDetail } else { $fontBlockRoot }
    $scriptPrefix = if ($isDetail) { "../" } else { "" }

    $content = [IO.File]::ReadAllText($file, [Text.Encoding]::UTF8)
    $original = $content

    # html data-theme
    if ($content -match '<html lang="zh-tw">') {
        $content = $content -replace '<html lang="zh-tw">', '<html lang="zh-tw" data-theme="apex">'
    } elseif ($content -match '<html lang="zh-tw" data-theme="[^"]+">') {
        $content = $content -replace 'data-theme="[^"]+"', 'data-theme="apex"'
    }

    # Ensure portfolio assets after style.css
    if ($content -notmatch 'portfolio-redesign\.css') {
        $content = $content -replace '(<link rel="stylesheet" href="(\.\./)?css/style\.css">)', "`$1`n$fontBlock"
    }

    # Body shell
    if ($content -notmatch 'class="pf-body"') {
        $content = $content -replace '<body>', "<body class=`"pf-body`">`n`t<div class=`"pf-site-bg`" aria-hidden=`"true`"></div>`n"
    }
    if ($content -match '<body class="pf-body">' -and $content -notmatch 'pf-site-bg') {
        $content = $content -replace '<body class="pf-body">', "<body class=`"pf-body`">`n`t<div class=`"pf-site-bg`" aria-hidden=`"true`"></div>`n"
    }

    # Normalize scripts
    $content = $content -replace '(?s)\s*<script src="(\.\./)?js/theme\.js"></script>\s*<script src="(\.\./)?js/main\.js"></script>', ''
    if ($content -match '<script src="(\.\./)?js/jquery\.waypoints\.min\.js"></script>') {
        $content = $content -replace '(<script src="(\.\./)?js/jquery\.waypoints\.min\.js"></script>)', "`$1`n`t<script src=`"${scriptPrefix}js/theme.js`"></script>`n`t<script src=`"${scriptPrefix}js/main.js`"></script>"
    }

    # Remove theme preview CTA from index
    $content = $content -replace '\s*<p class="pf-hero-actions">.*?</p>\s*', "`n"

    # Theme link always apex
    $content = $content -replace 'themes/theme-(arctic|quartz)\.css', 'themes/theme-apex.css'

    if ($content -ne $original) {
        [IO.File]::WriteAllText($file, $content, [Text.UTF8Encoding]::new($false))
        Write-Host "Updated: $name"
    }
}

Write-Host "HTML finalize done."
