"use client"
import React, { useState, useEffect } from "react";
import { Checkbox, Table, Pagination, Button } from "flowbite-react";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { FaMagnifyingGlass } from "react-icons/fa6";

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [select, setSelect] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editableRow, setEditableRow] = useState(null);

  

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle search/filter
  useEffect(() => {
    const filteredResults = data.filter((row) =>
      Object.values(row).some(
        (value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filteredResults);
    setCurrentPage(1); // Reset to the first page after filtering
  }, [searchTerm, data]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRows = filteredData.slice(startIndex, endIndex);

  const onPageChange = (page) => setCurrentPage(page);

  // Handle row selection
  const toggleSelectAll = () => {
    setSelect(!select);
    setSelectedRows(select ? [] : currentRows.map((row) => row.id));
  };

  const toggleRowSelection = (rowId) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId]
    );
  };

  // Handle delete selected rows
  const deleteSelectedRows = () => {
    const updatedData = data.filter((row) => !selectedRows.includes(row.id));
    setData(updatedData);
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  // Handle edit mode for a row
  const enterEditMode = (rowId) => {
    setEditableRow(rowId);
  };

  const exitEditMode = () => {
    setEditableRow(null);
  };

  const handleEdit = (rowId, field, value) => {
    const updatedData = data.map((row) =>
      row.id === rowId ? { ...row, [field]: value } : row
    );
    setData(updatedData);
    setFilteredData(updatedData);
    exitEditMode();
  };

  // Handle delete a row
  const handleDelete = (rowId) => {
    const updatedData = data.filter((row) => row.id !== rowId);
    setData(updatedData);
    setFilteredData(updatedData);
  };

  return (
    <div>
      <div>
        <h1 className="text-center py-3 font-semibold text-4xl fixed w-full bg-white z-10 shadow-sm">Dashboard</h1>
        <h1 className="pt-20">
          <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Members
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
            {filteredData.length} Total
          </span>


        </h1>
      </div>
      <div className="overflow-x-auto py-5 px-14">

      <div className="flex justify-between mb-4">
        <div className="flex space-x-4 justify-between flex-row w-full">
          <div>
             <Button onClick={toggleSelectAll} outline gradientDuoTone="cyanToBlue">
            {select ? "Deselect all" : "Select all"}
          </Button>
          </div>
         
          <div className="flex flex-row space-x-4 items-center border-gray-200 bg-gray-50 shadow-md rounded-2xl px-5 py-3  transition duration-300 ease-in-out focus:outline-none focus:shadow-outline border border-transparent focus:border-gray-30">
          <FaMagnifyingGlass />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none "
          />
         
        </div>
        <div>
          <Button onClick={deleteSelectedRows} color="failure">Delete Selected</Button>
        </div>
          
          
        </div>
        
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox checked={select} onChange={toggleSelectAll} />
          </Table.HeadCell>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentRows.map((row) => (
            <Table.Row
            key={row.id}
            className={`${
              selectedRows.includes(row.id) ? "bg-gray-300" : 
              (row.role === 'member' ? "bg-green-100" : "bg-gray-200")
            } dark:border-gray-700 dark:bg-gray-800`}
            >
              <Table.Cell className="p-4">
                <Checkbox
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleRowSelection(row.id)}
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {editableRow === row.id ? (
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleEdit(row.id, "name", e.target.value)}
                    onBlur={exitEditMode}
                  />
                ) : (
                  row.name
                )}
              </Table.Cell>
              <Table.Cell>{row.email}</Table.Cell>
              <Table.Cell className={"uppercase"}>{row.role}</Table.Cell>
              <Table.Cell className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                {editableRow === row.id ? (
                  <Button onClick={exitEditMode} color="failure" >Cancel</Button>
                ) : (
                  <Button color="success" onClick={() => enterEditMode(row.id)}>
                    <FaRegEdit />
                  </Button>
                )}
              </Table.Cell>
              <Table.Cell className="font-medium text-red-600 hover:underline dark:text-red-500">
                <Button className="flex flex-row gap-4" color="failure" onClick={() => handleDelete(row.id)} > <FaTrashAlt /> </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center mt-5">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          previousLabel="Previous"
          nextLabel="Next"
          showIcons
        />
      </div>
    </div>
    </div>
    
  );
};

export default TableComponent;
