import { useEffect, useState } from "react";
import { app } from "../firebaseConfig";
import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const FacultyList = () => {
    const [facultyData, setFacultyData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []); // Added dependency array to prevent infinite re-render

    const getData = async () => {
        const db = getFirestore(app);
        const collectionRef = collection(db, "faculty");

        try {
            const docSnap = await getDocs(collectionRef);
            const data = docSnap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFacultyData(data);
        } catch (err) {
            console.error("Error fetching faculty data:", err);
        }
    };

    const deleteDatalist = async (id) => {
        const db = getFirestore(app);
        const dataRef = doc(db, "faculty", id);

        try {
            await deleteDoc(dataRef);
            getData(); // Refresh data after deletion
        } catch (err) {
            console.error("Error deleting faculty data:", err);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Faculty List</h2>
            {facultyData?.length > 0 ? (
                facultyData.map((faculty) => (
                    <div
                        key={faculty.id}
                        style={{
                            backgroundColor: "#f9f9f9",
                            padding: "15px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
                            <strong>Name:</strong> {faculty.Name} <br />
                            <strong>Phone:</strong> {faculty.Phone}
                        </p>
                        <div style={{ display: "flex", gap: "10px" }}>
                            {/* Delete Button */}
                            <button
                                onClick={() => deleteDatalist(faculty.id)}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#ff4d4d",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    transition: "background-color 0.3s",
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
                                onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}
                            >
                                Delete
                            </button>
                            {/* Update Button */}
                            <button
                                onClick={() => navigate("/updatefaculty", { state: faculty })}
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "1rem",
                                    fontWeight: "bold",
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
                                Update
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
                    Loading faculty data...
                </p>
            )}
        </div>
    );
};

export default FacultyList;
