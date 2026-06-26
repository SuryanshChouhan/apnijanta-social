$files = Get-ChildItem -Path src/components -Filter *.tsx -Recurse
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace Link imports
    $content = $content -replace "import \{([^}]*)Link([^}]*)\} from 'react-router-dom';", "import Link from 'next/link';`nimport { `$1 `$2 } from 'react-router-dom';"
    $content = $content -replace "import \{\s*\} from 'react-router-dom';\r?\n", ""
    
    # Replace exact import { Link } from 'react-router-dom';
    $content = $content -replace "import \{\s*Link\s*\} from 'react-router-dom';", "import Link from 'next/link';"

    # Replace useNavigate and useParams
    $content = $content -replace "import \{([^}]*)useNavigate([^}]*)\} from 'react-router-dom';", "import { useRouter as useNavigate } from 'next/navigation';`nimport { `$1 `$2 } from 'react-router-dom';"
    $content = $content -replace "import \{([^}]*)useParams([^}]*)\} from 'react-router-dom';", "import { useParams } from 'next/navigation';`nimport { `$1 `$2 } from 'react-router-dom';"

    # Cleanup empty or malformed imports
    $content = $content -replace "import \{\s*\} from 'react-router-dom';\r?\n", ""
    $content = $content -replace "import \{\s*,\s*\} from 'react-router-dom';\r?\n", ""

    # Replace any remaining react-router-dom that has useNavigate
    $content = $content -replace "useNavigate", "useRouter"
    $content = $content -replace "import { useRouter as useRouter }", "import { useRouter }"

    Set-Content -Path $file.FullName -Value $content
}
