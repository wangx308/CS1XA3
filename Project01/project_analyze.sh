if test "$1" == ""
	then
		echo "you can have follow function:(please add after project_analyze.sh )
		1.function6
		  intro:Find and delete all UNTRACKED (and untracked only) ﬁles ending in the extension .tmp "
fi

if test "$1" == "function6"
	then
		list=$(git ls-files . --exclude-standard --others)
fi 

for i in $list;
do
if [ -e *.tmp ]
	then
		rm $i
fi
done
