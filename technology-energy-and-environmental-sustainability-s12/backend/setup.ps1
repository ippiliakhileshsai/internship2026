# PowerShell script to create backend folder structure
$baseDir = "."
$folders = @(
    "app\database",
    "app\models",
    "app\schemas",
    "app\services",
    "app\routers"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Path (Join-Path $baseDir $folder) -Force | Out-Null
    Write-Host "Created: $folder"
}

$files = @(
    ".env",
    "requirements.txt",
    "app\__init__.py",
    "app\main.py",
    "app\database\__init__.py",
    "app\database\connection.py",
    "app\database\base.py",
    "app\models\__init__.py",
    "app\models\energy_models.py",
    "app\schemas\__init__.py",
    "app\schemas\energy_schemas.py",
    "app\services\__init__.py",
    "app\services\simulation_engine.py",
    "app\services\recommendation_engine.py",
    "app\routers\__init__.py",
    "app\routers\api_routes.py"
)

foreach ($file in $files) {
    $filePath = Join-Path $baseDir $file
    if (-not (Test-Path $filePath)) {
        New-Item -ItemType File -Path $filePath -Force | Out-Null
        Write-Host "Created: $file"
    }
}

Write-Host "Folder structure created successfully!"
