#include<iostream>
using namespace std;
int main(){
	int x = 945;
	for(int i = x;i<969;i++){
	cout<<"<td><button class=\"selector\" onclick = \"returnData('&#"<<i<<";')\">&#"<<i<<";</button></td>"<<endl;
}

return 0;
}
