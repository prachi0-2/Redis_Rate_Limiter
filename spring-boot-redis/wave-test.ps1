# URL to test
$URL = "http://localhost:8080/test?userId=john"

# Function to simulate a load phase
function Test-Phase($name, $requests, $parallel) {
    Write-Host "`n🔥 Phase: $name"

    $jobs = @()
    for ($i = 1; $i -le $parallel; $i++) {
        $jobs += Start-Job {
            param($url, $req)
            for ($j = 1; $j -le $req; $j++) {
                try {
                    Invoke-RestMethod -Uri $url -ErrorAction Stop
                } catch {
                    Write-Host "Request failed: $($_.Exception.Message)"
                }
            }
        } -ArgumentList $URL, $requests
    }

    # Wait for all jobs to finish
    $jobs | Wait-Job | Receive-Job
    $jobs | Remove-Job
}

# Phase definitions (requests per job, number of parallel jobs)
Test-Phase "Low load" 10 5
Test-Phase "Medium load" 20 10
Test-Phase "High load" 50 20
Test-Phase "Burst load" 100 30
Test-Phase "Cooldown" 10 5
