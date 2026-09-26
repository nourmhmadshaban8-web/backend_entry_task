"""print ("answer Q1")
print("______________")
my_dict = {'0': 1, '1': 2, '2': 3, '3': 4}
n = input("Enter the key: ")
if n in my_dict:
    print("Yes")
else:
    print("No")
"""    
    
    
"""print ("answer Q2")
print("______________")    
my_dict = {'a': 1, 'b': 3, 'c': 1, 'd': 3, 'e': 1}
result = {}
for val in my_dict.values():
    if val in result:
        result[val] += 1
    else:
        result[val] = 1 
print(result)
"""


"""print ("answer Q3")
print("______________") 
my_dict = {'a': [1, 2, 3], 'b': 2, 'c': "Ahmed", 'd': 3, 'e': 1}
values_list = list(my_dict.values())
is_same = True
if values_list:
    first_type = type(values_list[0])
    for val in values_list:
        if type(val) != first_type:
            is_same = False
            break
print(is_same)
"""