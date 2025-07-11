$dest = "public/circuits"
if (!(Test-Path $dest)) { New-Item -ItemType Directory -Path $dest }

$urls = @{
    "bahrain.svg" = "https://upload.wikimedia.org/wikipedia/commons/4/4c/Bahrain_International_Circuit--Grand_Prix_Layout.svg"
    "jeddah.svg" = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Jeddah_Street_Circuit_2021.svg"
    "albertpark.svg" = "https://upload.wikimedia.org/wikipedia/commons/2/2d/Melbourne_GP_Circuit.svg"
    "suzuka.svg" = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Suzuka_circuit_map--2005.svg"
    "shanghai.svg" = "https://upload.wikimedia.org/wikipedia/commons/7/7e/Shanghai_International_Racing_Circuit_track_map.svg"
    "miami.svg" = "https://upload.wikimedia.org/wikipedia/commons/3/32/Miami_International_Autodrome_2022.svg"
    "imola.svg" = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Circuit_Imola_2009.svg"
    "monaco.svg" = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Monte_Carlo_Formula_1_track_map.svg"
    "gillesvilleneuve.svg" = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Circuit_Gilles_Villeneuve.svg"
    "barcelona.svg" = "https://upload.wikimedia.org/wikipedia/commons/9/9c/Circuit_de_Barcelona_Catalunya.svg"
    "redbullring.svg" = "https://upload.wikimedia.org/wikipedia/commons/0/0c/Red_Bull_Ring.svg"
    "silverstone.svg" = "https://upload.wikimedia.org/wikipedia/commons/0/09/Silverstone_Circuit_2011.svg"
    "hungaroring.svg" = "https://upload.wikimedia.org/wikipedia/commons/6/6b/Hungaroring.svg"
    "spa.svg" = "https://upload.wikimedia.org/wikipedia/commons/2/2b/Spa-Francorchamps_of_Belgium.svg"
    "zandvoort.svg" = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Circuit_Zandvoort-2020.svg"
    "monza.svg" = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Monza_track_map.svg"
    "baku.svg" = "https://upload.wikimedia.org/wikipedia/commons/9/9b/Baku_city_circuit.svg"
    "marinabay.svg" = "https://upload.wikimedia.org/wikipedia/commons/6/6c/Marina_Bay_Street_Circuit_2015.svg"
    "cota.svg" = "https://upload.wikimedia.org/wikipedia/commons/2/2b/Circuit_of_the_Americas.svg"
    "mexico.svg" = "https://upload.wikimedia.org/wikipedia/commons/1/1a/Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez.svg"
    "interlagos.svg" = "https://upload.wikimedia.org/wikipedia/commons/1/1c/Interlagos.svg"
    "lasvegas.svg" = "https://upload.wikimedia.org/wikipedia/commons/6/6f/Las_Vegas_Grand_Prix_circuit_map.svg"
    "losail.svg" = "https://upload.wikimedia.org/wikipedia/commons/0/0a/Losail_International_Circuit.svg"
    "yasmarina.svg" = "https://upload.wikimedia.org/wikipedia/commons/5/5a/Yas_Marina_Circuit_2010.svg"
}

foreach ($name in $urls.Keys) {
    $url = $urls[$name]
    $out = Join-Path $dest $name
    Invoke-WebRequest -Uri $url -OutFile $out
    Write-Host "Téléchargé: $name"
}