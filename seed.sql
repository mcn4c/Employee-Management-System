


INSERT INTO department (name)
VALUES ("Production"), ("Marketing"), ("Accounting"), ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 75000, 1), ("General Production Worker", 35000, 1), ("Senior Production Worker", 65000, 1), ("Manager", 90000, 2), ("Marketing Analyst", 60000, 2), ("Marketing Specialist", 50000, 2), ("Markeing Coordinator", 50000, 2), ("Marketing Consultant", 50000, 2), ("Manager", 80000, 3), ("Accountant", 60000, 3), ("Accounts Payable", 45000, 3), ("Accounts Receivable", 45000, 3) ,("Bookkeeper", 30000, 3), ("Manager", 70000, 4), ("Employement Specialist", 25000, 4) ,("HR Coordinator", 30000, 4), ("HR Recruiter", 55000, 4), ("Labor Relations", 80000, 4);

INSERT INTO employee (firstName, lastName, role_id, manager_id)
VALUES ("Emmet", "Brown", 1, 1), ("Gunderson", "Marge", 2, 1), ("Luke", "Jackson", 3, 1), ("Jack", "Skellington", 3, 1),  ("Beatrix", "Kiddo", 3, 1), ("Jules", "Winnfield", 3, 1), ("Peter", "Venkman", 3, 1),("Jack", "Torrance", 4, 4), ("Walter", "Sobchak", 5, 4), ("Ellen", "Ripley", 6, 4), ("Ellis", "Redding", 7, 4), ("Charles", "Kane", 8, 4), ("Rose", "Sayer", 9, 9), ("Antoine", "Doinel", 10, 9), ("Melanie", "Daniels", 11, 9), ("Stanley", "Kowalski", 12, 9), ("Sam", "Spade", 13, 9), ("Annie", "Wilkens", 13, 9), ("Sandy", "Olson", 14, 14), ("Harry", "Powell", 15, 14), ("Terry", "Malloy", 16, 14), ("John", "Shaft", 16, 14), ("Phyllis", "Dietrichson", 17, 14), ("Ratso", "Rizzo", 18, 14); 


