import { useState } from "react";
import API from "../../api";

function QuestionImport({ onImport }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleImport = async () => {
        if (!file) {
            setMessage("Please select a CSV file.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await API.post(
                "/questions/import",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setMessage(
                `${response.data.imported} imported, ${response.data.skipped} skipped.`
            );

            setFile(null);

            if (onImport) {
                onImport();
            }

        } catch (err) {
            console.error(err);
            setMessage("Failed to import questions.");
        }
    };

    return (
        <div className="import-box">
            <h2>Import Questions</h2>

            <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleImport}>
                Upload CSV
            </button>

            {message && (
                <p>{message}</p>
            )}
        </div>
    );
}

export default QuestionImport;