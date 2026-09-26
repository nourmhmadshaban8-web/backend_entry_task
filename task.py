my_list=[10,20,30,40,50]
for i in range(len(my_list) -1,-1,-1):
    print(my_list[i])
    
print("_____________________________________")

name=input("enter the a string : ").lower()
vowels=('a','e','i','o','u')
result=""
for i in name:
    if i not in vowels:
        result+=i
print(" output",result)
