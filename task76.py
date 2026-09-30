class Member:
    def __init__(self,first_name,middle_name,last_name,gender):
        print("a new member has been added")
        self.fname=first_name
        self.mname=middle_name
        self.lname=last_name
        self.gender=gender.lower()

    def full_name(self):
        return f"{self.fname} {self.mname} {self.lname}"

    def name_with_title(self):
        if self.gender=="male":
            return f"Mr / {self.fname}"
        elif self.gender=="female":
            return f"Mrs / {self.fname}"
        else:
            return f"{self.fname}"