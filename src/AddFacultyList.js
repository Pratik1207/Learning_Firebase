import { useState } from "react";
import { collection, getFirestore, addDoc } from "firebase/firestore";
import { app } from "../src/firebaseConfig";
import { useNavigate } from "react-router-dom";

const AddFacultyList = () => {
    const [facultyName, setFacultyName] = useState("");
    const [facultyPhone, setFacultyPhone] = useState("");

    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();
        console.log(facultyName, facultyPhone);

        const db = getFirestore(app);

        try {
            await addDoc(collection(db, "faculty"), {
                Name: facultyName,
                Phone: facultyPhone,
            });
            setFacultyName("");
            setFacultyPhone("");
            console.log("Data added successfully");
            navigate("/facultylist");
        } catch (err) {
            console.error("Error adding document:", err);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Add Faculty</h2>
            <form 
                onSubmit={formSubmit} 
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    maxWidth: "400px",
                    margin: "0 auto",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                <input
                    placeholder="Name"
                    onChange={(e) => setFacultyName(e.target.value)}
                    value={facultyName}
                    style={{
                        padding: "10px",
                        fontSize: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        outline: "none",
                        transition: "border-color 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
                <input
                    placeholder="Phone Number"
                    onChange={(e) => setFacultyPhone(e.target.value)}
                    value={facultyPhone}
                    style={{
                        padding: "10px",
                        fontSize: "1rem",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        outline: "none",
                        transition: "border-color 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#007BFF")}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        fontSize: "1rem",
                        color: "#fff",
                        backgroundColor: "#28a745",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 0.3s, transform 0.3s",
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#218838";
                        e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = "#28a745";
                        e.target.style.transform = "scale(1)";
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddFacultyList;
