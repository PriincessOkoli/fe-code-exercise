import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Members } from "../type";
import MockAdapter from "axios-mock-adapter";
import ModalState from "../components/ModalState";
import DeleteModal from "./DeleteModal";
import ToastMessage from "./ToastMessage";

export default function Home() {
  const [objects, setObjects] = useState<Members[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredObjects, setFilteredObjects] = useState<Members[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [name, setName] = useState("");

  var mock = new MockAdapter(axios);

  mock.onGet("/members").reply(200, {
    members: [
      {
        id: 1,
        name: "John Doe",
        role: "Developer",
        type: "Employee",
        country: "USA",
        salary: "$80,000",
      },
      {
        id: 2,
        name: "pone Smith",
        role: "Designer",
        type: "Contractor",
        country: "Canada",
        salary: "$60,000",
      },
      {
        id: 3,
        name: "anne minolr",
        role: "Designer",
        type: "Employee",
        country: "UK",
        salary: "$62,800",
      },
    ],
  });

  useEffect(() => {
    axios
      .get("/members")
      .then((response) => {
        setObjects(response.data.members);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  mock.onDelete(/^\/members\/\d+/).reply((config) => {
    const objectId = config.url?.match(/\d+/)?.[0];

    if (objectId) {
      return [200, { message: `Object ${objectId} deleted successfully` }];
    } else {
      return [404];
    }
  });

  const handleDelete = (objectId: string) => {
    axios
      .delete(`/members/${objectId}`)
      .then(() => {
        setObjects((prevObjects) =>
          prevObjects.filter((item) => item.id !== objectId)
        );
        setNotificationMessage(`You’ve successfully removed ${name}.`);
        setShowNotification(true);

        setTimeout(() => {
          setShowNotification(false);
        }, 4000);
      })
      .catch((error) => {
        setNotificationMessage("Sorry, something went wrong.");
        setShowNotification(true);
      });
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((t) => t !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };
  useEffect(() => {
    const filteredMembers = objects.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedTypes.length === 0 || selectedTypes.includes(member.type))
    );
    setFilteredObjects(filteredMembers);
  }, [objects, searchQuery, selectedTypes]);

  return (
    <>
      <div className="home-container">
        <div className="header">
          <h2>
            People <b>{objects?.length} members</b>
          </h2>
          <button>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.70855 12.8752C4.49307 12.0906 5.55712 11.6499 6.66661 11.6499H13.3333C14.4428 11.6499 15.5068 12.0906 16.2913 12.8752C17.0759 13.6597 17.5166 14.7237 17.5166 15.8332V17.4999C17.5166 17.9693 17.1361 18.3499 16.6666 18.3499C16.1972 18.3499 15.8166 17.9693 15.8166 17.4999V15.8332C15.8166 15.1746 15.555 14.543 15.0893 14.0773C14.6235 13.6115 13.9919 13.3499 13.3333 13.3499H6.66661C6.00799 13.3499 5.37634 13.6115 4.91063 14.0773C4.44491 14.543 4.18328 15.1746 4.18328 15.8332V17.4999C4.18328 17.9693 3.80272 18.3499 3.33328 18.3499C2.86383 18.3499 2.48328 17.9693 2.48328 17.4999V15.8332C2.48328 14.7237 2.92402 13.6597 3.70855 12.8752Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.99996 3.3499C8.62846 3.3499 7.51663 4.46173 7.51663 5.83324C7.51663 7.20474 8.62846 8.31657 9.99996 8.31657C11.3715 8.31657 12.4833 7.20474 12.4833 5.83324C12.4833 4.46173 11.3715 3.3499 9.99996 3.3499ZM5.81663 5.83324C5.81663 3.52284 7.68957 1.6499 9.99996 1.6499C12.3104 1.6499 14.1833 3.52284 14.1833 5.83324C14.1833 8.14363 12.3104 10.0166 9.99996 10.0166C7.68957 10.0166 5.81663 8.14363 5.81663 5.83324Z"
                  fill="white"
                />
              </svg>
            </div>
            <p>Add member</p>
          </button>
        </div>
        <div className="table-container">
          <div className="table-top">
            <div className="search-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.0719 12.1326C10.0405 12.9373 8.74289 13.4167 7.33333 13.4167C3.9736 13.4167 1.25 10.6931 1.25 7.33333C1.25 3.9736 3.9736 1.25 7.33333 1.25C10.6931 1.25 13.4167 3.9736 13.4167 7.33333C13.4167 8.7429 12.9373 10.0405 12.1326 11.072L14.5303 13.4697C14.8232 13.7626 14.8232 14.2374 14.5303 14.5303C14.2374 14.8232 13.7625 14.8232 13.4696 14.5303L11.0719 12.1326ZM2.75 7.33333C2.75 4.80203 4.80203 2.75 7.33333 2.75C9.86464 2.75 11.9167 4.80203 11.9167 7.33333C11.9167 8.56597 11.4301 9.68496 10.6385 10.5087C10.6146 10.5274 10.5916 10.5477 10.5696 10.5697C10.5477 10.5917 10.5273 10.6146 10.5087 10.6385C9.68494 11.4301 8.56596 11.9167 7.33333 11.9167C4.80203 11.9167 2.75 9.86464 2.75 7.33333Z"
                  fill="#525F7F"
                />
              </svg>
              <input
                type="search"
                placeholder="Search people..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="checkbox-container">
              <div className="checkbox">
                <p>Contractor</p>
                <input
                  type="checkbox"
                  value="Contractor"
                  checked={selectedTypes.includes("Contractor")}
                  onChange={handleTypeChange}
                />
              </div>
              <div className="checkbox">
                <p>Employee</p>
                <input
                  type="checkbox"
                  value="Employee"
                  checked={selectedTypes.includes("Employee")}
                  onChange={handleTypeChange}
                />
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>ROLE</th>
                <th>TYPE</th>
                <th>COUNTRY</th>
                <th>SALARY</th>
                <th className="delete-th"></th>
              </tr>
            </thead>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <tbody>
                {filteredObjects?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.role}</td>
                    <td>{item.type}</td>
                    <td>{item.country}</td>
                    <td>{item.salary}</td>
                    <td className="delete-td">
                      <ModalState>
                        {(isVisible, open, close) => (
                          <>
                            <button
                              onClick={() => {
                                open();
                                setName(item.name);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <DeleteModal
                              isVisible={isVisible}
                              close={close}
                              name={item.name}
                              id={item.id}
                              next={() => handleDelete(item.id)}
                            />
                          </>
                        )}
                      </ModalState>

                      <ToastMessage
                        message={notificationMessage}
                        isVisible={showNotification}
                        onClose={() => setShowNotification(false)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
}
