package main

import (
	"fmt"
	"math"
)

func main() {

	var yearRange []int = []int{2000, 2020}

	for i := yearRange[0]; i <= yearRange[1]; i++ {
		fmt.Printf("Year: %d, Population: %d\n", i, int(popFunc(i)))
	}
}

func popFunc(year int) float64 {

	var initialYear int = 1950
	var timeframe int = year - initialYear
	var initialPop int = 2560
	var k float64 = 0.017

	return float64(initialPop) * math.Exp(k*float64(timeframe))
}
