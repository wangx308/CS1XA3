if test "$1" == ""
	then
		echo "you can have follow function:(please add after project_analyze.sh )
		1.function6
		  intro:Find and delete all UNTRACKED (and untracked only) ﬁles ending in the extension .tmp
		2.function2
		  intro:Puts each line of every ﬁle in repo with the tag #TODO into a ﬁle todo.log
		3.function8
		  intro:Change binary system, octal number system, hexadecimal, thirty-two base and sixty-four base to decimalism
		4.function3
		  intro: Find Haskell and Python ﬁles in repo that fail to compile and put them in a ﬁle compile_fail.log"
fi

if test "$1" == "function6"
	then
		list=$(git ls-files . --exclude-standard --others)
		for i in $list;
		do
		if [ -e *.tmp ]
			then
				rm $i
		fi
		done
		git add -A
fi



if test "$1" == "function2"
	then
		[ -e todo.log ] && rm todo.log
		grep "#TODO" ../ -n -r --exclude=todo.log > todo.log
		git add -A
fi



if test "$1" == "function8"
	then
		read -p "Please enter the number system that would be changed " system
		if [ "$system " -eq "2" ] || [ "$system " -eq "8" ] || [ "$system " -eq "16" ] || [ "$system " -eq "32" ] || [ "$system " -eq "64" ]
			then
				read -p "Please enter the number you want to change " number
				((num=$system#$number)) 2>/dev/null
				if [ $? -eq 0 ]
					then
						echo "the number $number changed to $num after decimalism"	
				else
					echo "Please enter appropriate number"
				fi
		else
			echo "Please enter following system: 2, 8, 16, 32, 64"
		fi
		git add -A
fi

if test "$1" == "function3"
	then
		sed -e '/*.py/d'  compile_fail.log > compile_fail.log
		sed -e '/*.sh/d'  compile_fail.log > compile_fail.log
		for file in $(ls *.py)
		do
			./$file 2>/dev/null
			if [ $? -ne 0 ]; then
				echo $file >> compile_fail.log 
			fi
		done 2>/dev/null
		
		for file2 in $(ls *.hs)  
		do
			./$file2 2>/dev/null
			if [ $? -ne 0 ]; then
				echo $file2 >> compile_fail.log 
			fi
		done 2>/dev/null
		cat compile_fail.log 
fi


