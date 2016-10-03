// https://en.wikipedia.org/wiki/Newton%27s_method

// Calculate √5
// 	Initial value is between 2 and 3 = 2.5
// 	√4 = 2
// 	√9 = 3
// 	√5 = x <-> x^2 = 5 <-> f(x) = x^2 - 5

package main

import (
	"fmt"
	"math"
)

func main() {

	// Initial value
	var x float64 = 3.5
	// 4 digit accuracy
	var tolerance float64 = math.Pow(10, -4)
	// Don't want to divide by a number smaller than this
	var epsilon float64 = math.Pow(10, -14)
	// Don't allow the iterations to continue indefinitely
	var maxIterations int = 20

	for iteration := 0; iteration < maxIterations; iteration++ {

		if math.Abs(fd(x)) < epsilon {
			// dominator is too small
			break
		}

		// Newton's computation
		xnn := xnn(x)

		fmt.Printf("X(n+%d) = %.4f\n", iteration, x)

		if math.Abs(xnn-x) <= tolerance*math.Abs(tolerance) {
			// result converged and is within the desired tolerance
			break
		}

		// iterate with the next x value
		x = xnn
	}
}

// Function whose root we are trying to find
func xnn(x float64) float64 {
	return x - (f(x) / fd(x))
}

func f(x float64) float64 {
	return math.Pow(x, 3) - 30
}

// The derivative of f(x)
func fd(x float64) float64 {
	return 3 * math.Pow(x, 2)
}

// Simplified way
func simplified() {

	// Initial value
	var x float64 = 2.5
	// Don't allow the iterations to continue indefinitely
	var maxIterations int = 20

	for iteration := 0; iteration < maxIterations; iteration++ {
		// Newton's computation
		x := xnn(x)

		fmt.Printf("X(n+%d) = %.5f\n", iteration, x)
	}
}
